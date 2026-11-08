import fs from "node:fs";
import {pathToFileURL} from "node:url";

export const allowedStates = new Set(["queued","in_progress","blocked","needs_review","published"]);
export const allowedTypes = new Set(["function","article"]);

export function validateQueue(queue){
  const problems=[];
  if(queue?.schemaVersion!==1)problems.push("Unsupported production queue schemaVersion.");
  if(!queue?.policy?.functionsFirst || queue?.policy?.maxItemsPerRun!==1)problems.push("Function-first, one-item-per-run invariants missing.");
  if(!/^https:\/\/[a-z0-9.-]+$/.test(queue?.productionOrigin||""))problems.push("Production origin must be a valid https hostname.");
  const tasks=queue?.tasks;
  if(!Array.isArray(tasks)||!tasks.length)return [...problems,"Queue must contain tasks."];
  const ids=new Set(),targets=new Set();
  let seenArticle=false,active=0;
  const byId=new Map(tasks.map(t=>[t.id,t]));
  const functions=tasks.filter(t=>t.type==="function");
  for(const task of tasks){
    const id=task?.id || "(missing id)";
    if(ids.has(id))problems.push("Duplicate ID "+id);ids.add(id);
    if(!allowedTypes.has(task.type))problems.push(id+": invalid type");
    if(task.type==="article")seenArticle=true;
    if(task.type==="function"&&seenArticle)problems.push(id+": all functions must appear before articles");
    if(!new RegExp("^"+(task.type==="function"?"F":"A")+"\\d{3}$").test(id))problems.push(id+": invalid ID format");
    if(!allowedStates.has(task.status))problems.push(id+": unsupported state");
    if(task.status==="in_progress")active++;
    if(!Number.isInteger(task.priority))problems.push(id+": priority must be an integer");
    for(const key of ["title","keywordCandidate","cluster","deliverable"]){
      if(typeof task[key]!=="string"||task[key].trim().length<5)problems.push(id+": missing "+key);
    }
    if(task.targetPath!==null){
      if(typeof task.targetPath!=="string"||!/^\/(?:[a-z0-9-]+\/)*$/.test(task.targetPath)){
        problems.push(id+": unsafe canonical path");
      }else if(task.type==="article"&&targets.has(task.targetPath))problems.push(id+": duplicate article path");
      if(task.type==="article")targets.add(task.targetPath);
    }else if(task.type==="article")problems.push(id+": articles need a targetPath");
    if(!Array.isArray(task.dependsOn))problems.push(id+": invalid dependencies");
    else for(const dep of task.dependsOn){
      if(dep===id||!byId.has(dep))problems.push(id+": missing/self dependency "+dep);
      if(task.type==="function" && dep.startsWith("A"))problems.push(id+": function cannot depend on article "+dep);
    }
    if(task.status==="published"){
      const r=task.release;
      if(!r||!(/^[a-f0-9]{40}$/.test(r.sha||""))||!r.deploymentId||!r.ciRunUrl||
         !r.verifiedAt||!r.liveUrl||!task.evidence){
        problems.push(id+": cannot mark published without verified CI, deployment, live URL and evidence");
      }
      if(task.targetPath && r?.liveUrl!==queue.productionOrigin+task.targetPath)problems.push(id+": published live URL not canonical");
    }
    if(["blocked","needs_review"].includes(task.status) && !task.blocker?.reason)
      problems.push(id+": blocked/review state needs a blocker.reason");
    if(task.status==="in_progress" && (!task.claim?.id||!task.claim?.at))
      problems.push(id+": in_progress requires a claim");
  }
  if(active>1)problems.push("At most one task may be in_progress.");
  if(tasks.some(t=>t.type==="article"&&t.status!=="queued") &&
     functions.some(t=>t.status!=="published")){
    problems.push("Articles cannot start before all functional tasks are verifiably published.");
  }
  for(const t of tasks)if(t.status==="published"){
    for(const dep of t.dependsOn)if(byId.get(dep)?.status!=="published")
      problems.push(t.id+": published before dependency "+dep);
  }
  return problems;
}

export function selectNextTask(queue){
  const tasks=Array.isArray(queue?.tasks)?queue.tasks:[];
  const active=tasks.filter(t=>t.status==="in_progress");
  if(active.length>1)return {task:null,reason:"Multiple active claims; inspect and resolve safely."};
  if(active.length)return {task:active[0],reason:"Resume existing claimed work before opening another item."};
  const functions=tasks.filter(t=>t.type==="function");
  const pool=functions.every(t=>t.status==="published")?tasks.filter(t=>t.type==="article"):functions;
  const byId=new Map(tasks.map(t=>[t.id,t]));
  const options=pool.filter(t=>t.status!=="published").sort((a,b)=>b.priority-a.priority||a.id.localeCompare(b.id));
  if(!options.length)return {task:null,reason:"All planned work is published; review analytics before adding new work."};
  const next=options[0];
  if(next.status==="needs_review")return {task:next,reason:"Human signoff required; do not bypass safety gate."};
  if((next.dependsOn||[]).some(dep=>byId.get(dep)?.status!=="published"))
    return {task:next,reason:"Dependency not published; repair prerequisite before starting new work."};
  return {task:next,reason:next.status==="blocked"?"Retry or escalate this blocker before new work.":"Selected highest-priority eligible item."};
}

if(process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href){
  const file=process.argv[2]||"docs/production/queue.json";
  const q=JSON.parse(fs.readFileSync(file,"utf8"));
  const problems=validateQueue(q);
  if(problems.length){problems.forEach(p=>console.error("FAIL",p));process.exitCode=1;}
  else {
    const selected=selectNextTask(q);
    console.log("PASS:",q.tasks.length,"planned items (",q.tasks.filter(t=>t.type==="function").length,"functions,",
      q.tasks.filter(t=>t.type==="article").length,"articles ).");
    console.log("NEXT:",selected.task?.id??"(none)",selected.task?.title??"",selected.reason);
  }
}

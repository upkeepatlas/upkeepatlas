import {validDate} from "./maintenance-log.mjs";
const clean=(v,max)=>{const s=String(v??"").trim();if(s.length>max)throw new Error("Entry exceeds "+max+" characters.");return s;};
export function normalizeAppliance(v){
 if(!v||typeof v!=="object")throw new Error("Invalid appliance.");
 const name=clean(v.name,80),brand=clean(v.brand,80),model=clean(v.model,100),location=clean(v.location,80),manual=clean(v.manual,240);
 if(!name||!model)throw new Error("Appliance name and model are required.");
 return {id:clean(v.id,80)||cryptoId(),name,brand,model,location,manual};
}
function cryptoId(){return "item-"+Date.now().toString(36)+"-"+Math.random().toString(36).slice(2,10);}
export function normalizeActivity(v,appliances){
 if(!v||typeof v!=="object")throw new Error("Invalid activity.");
 const applianceId=clean(v.applianceId,80),task=clean(v.task,160),date=clean(v.date,10),next=clean(v.next,10),notes=clean(v.notes,300);
 if(!appliances.some(a=>a.id===applianceId))throw new Error("Select a registered appliance.");
 if(!task||!validDate(date)||(next&&!validDate(next)))throw new Error("Enter a task and valid completed date; check optional next date.");
 if(next&&next<date)throw new Error("Next date cannot precede the recorded date.");
 return {applianceId,task,date,next,notes};
}
export function exportAppliances(appliances,activities){
 const data={version:1,appliances,activities};
 return JSON.stringify(data,null,2)+"\n";
}
export function importAppliances(text){
 if(typeof text!=="string"||text.length>1000000)throw new Error("Backup must be under 1 MB.");
 const data=JSON.parse(text);
 if(data?.version!==1||!Array.isArray(data.appliances)||!Array.isArray(data.activities)||data.appliances.length>100||data.activities.length>1000)throw new Error("Unsupported backup or too many entries.");
 const appliances=data.appliances.map(normalizeAppliance);
 if(new Set(appliances.map(a=>a.id)).size!==appliances.length)throw new Error("Duplicate equipment IDs.");
 return {appliances,activities:data.activities.map(a=>normalizeActivity(a,appliances))};
}
export function upcoming(activities,today){return activities.filter(a=>a.next).map(a=>({...a,overdue:a.next<today})).sort((a,b)=>a.next.localeCompare(b.next));}

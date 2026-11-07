/**
 * Starter planning rules. Months are editorial suggestions, not legal, code,
 * warranty, or model-specific service intervals. Each task cites a primary source.
 */
export const sourceLinks = {
  epa: "https://www.epa.gov/mold/brief-guide-mold-moisture-and-your-home",
  energy: "https://www.energystar.gov/saveathome/heating-cooling",
  hvac: "https://www.energystar.gov/saveathome/heating-cooling/maintenance-checklist",
  cpsc: "https://www.cpsc.gov/Newsroom/News-Releases/2026/CPSC-Issues-Winter-Weather-Safety-Tips-to-Prevent-Fires-and-Carbon-Monoxide-Poisoning",
  air: "https://www.energy.gov/energysaver/air-sealing-your-home"
};
const ALL = Array.from({length:12},(_,i)=>i+1);
export const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
export const TASKS = [
  {id:"leaks",title:"Look for signs of moisture or leaks",detail:"Check visible areas near sinks, water-using appliances and windows; act promptly if damp.",months:ALL,level:"Observe",source:"epa"},
  {id:"alarms",title:"Test smoke and carbon monoxide alarms",detail:"Follow each alarm's test procedure and replace units or batteries per its instructions.",months:ALL,level:"Safety",source:"cpsc"},
  {id:"filters",title:"Check the HVAC air filter",detail:"Inspect monthly; replace as indicated by the filter, system manual and visible dirt.",months:ALL,level:"Routine",source:"energy",features:["hvac"]},
  {id:"manuals",title:"Review home manuals and service records",detail:"Check appliance guides and note model-specific maintenance due this year.",months:[1],level:"Plan",source:"energy"},
  {id:"drainage",title:"Observe drainage and signs of pooling water",detail:"After rainfall, look from ground level for ponding near the foundation.",months:[4,9],level:"Observe",source:"epa",exclude:["condo"]},
  {id:"gutters",title:"Check visible gutter and downspout condition",detail:"Look from ground level for blockage, overflow or separation. Leave ladder/roof work to a qualified professional.",months:[4,10],level:"Observe",source:"epa",features:["gutters"],exclude:["condo"]},
  {id:"cooling",title:"Arrange a cooling-system service",detail:"Book qualified maintenance before heavy cooling season, following the system manual.",months:[4],level:"Professional",source:"hvac",features:["hvac"]},
  {id:"heating",title:"Arrange a heating-system service",detail:"Ask a qualified contractor to inspect the heating system before heavy use.",months:[9],level:"Professional",source:"hvac",features:["hvac"]},
  {id:"weather",title:"Note drafty doors or windows",detail:"Record any obvious air leaks; assess ventilation and combustion safety before sealing projects.",months:[9,10],level:"Observe",source:"air"},
  {id:"winter",title:"Check exposed outdoor areas before cold weather",detail:"Review outdoor water supply and seasonal protection guidance for your specific climate and fixtures.",months:[10],level:"Plan",source:"epa",climates:["cold"]},
  {id:"humid",title:"Watch indoor condensation and humidity",detail:"Investigate recurring condensation and reduce moisture sources.",months:[12,1,2],level:"Observe",source:"epa",climates:["cold","temperate"]},
  {id:"dryer",title:"Review dryer lint and vent care",detail:"Keep the lint screen clean each use; arrange vent servicing as advised by manufacturer.",months:[6],level:"Safety",source:"cpsc",features:["dryer"]},
  {id:"log",title:"Update your maintenance log",detail:"Record completed work, dates, receipts and questions for future service.",months:[3,6,9,12],level:"Plan",source:"energy"}
];
export function generatePlan({climate="temperate",home="detached",features=["hvac","gutters","dryer"]}={}) {
  const enabled=new Set(features);
  /** @type {{name:string,number:number,tasks:{id:string,title:string,detail:string,level:string,source:string}[]}[]} */
  const result=months.map((name,index)=>({name,number:index+1,tasks:[]}));
  for(const task of TASKS){
    if(task.features && !task.features.every(f=>enabled.has(f))) continue;
    if(task.exclude?.includes(home)) continue;
    if(task.climates && !task.climates.includes(climate)) continue;
    for(const month of task.months){result[month-1].tasks.push({id:task.id+"-"+month,title:task.title,detail:task.detail,level:task.level,source:sourceLinks[task.source]});}
  }
  return result;
}

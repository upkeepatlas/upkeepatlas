/** Seasonal suggestions are observations and planning prompts, not prescribed service intervals. */
export const SEASONS=["spring","summer","fall","winter"];
export const CLIMATES=["mixed","cold","hot","wet","dry"];
export const SYSTEMS=["hvac","water","exterior","safety"];
export const TASKS=[
{id:"alarms",season:"all",system:"safety",climates:["all"],priority:1,title:"Review smoke and CO alarm status",detail:"Use each device's manufacturer instructions and applicable local requirements; arrange help for faults."},
{id:"exits",season:"all",system:"safety",climates:["all"],priority:2,title:"Review emergency exits and contacts",detail:"Keep escape routes accessible and update your household emergency plan."},
{id:"filters",season:"all",system:"hvac",climates:["all"],priority:2,title:"Check HVAC filter inspection instructions",detail:"Use your specific equipment manual to determine when to inspect or replace; do not assume a universal interval."},
{id:"spring-water",season:"spring",system:"water",climates:["all"],priority:1,title:"Look for post-winter moisture",detail:"From accessible dry locations, note stains or visible leaks and arrange professional evaluation if needed."},
{id:"spring-exterior",season:"spring",system:"exterior",climates:["all"],priority:2,title:"Observe exterior drainage from ground level",detail:"After rain, note standing water or overflowing gutters. No ladder or roof access."},
{id:"spring-cooling",season:"spring",system:"hvac",climates:["all"],priority:2,title:"Plan cooling-system service if your manual calls for it",detail:"Schedule a qualified technician; do not open electrical or refrigerant components."},
{id:"summer-heat",season:"summer",system:"hvac",climates:["hot","mixed","dry"],priority:1,title:"Check cooling comfort and visible airflow obstructions",detail:"Keep accessible indoor vents unobstructed; seek service for unusual behavior."},
{id:"summer-water",season:"summer",system:"water",climates:["wet","mixed","hot"],priority:2,title:"Observe condensation and accessible plumbing",detail:"Record recurring moisture and seek professional assessment; do not diagnose hidden leaks."},
{id:"summer-exterior",season:"summer",system:"exterior",climates:["all"],priority:2,title:"Check visible window and door seals",detail:"From safe ground-level positions, note obvious gaps and damage for later assessment."},
{id:"fall-heat",season:"fall",system:"hvac",climates:["all"],priority:1,title:"Plan heating-system inspection if recommended",detail:"Follow manufacturer guidance and use a qualified service provider for gas, combustion or electrical equipment."},
{id:"fall-freeze",season:"fall",system:"water",climates:["cold","mixed"],priority:1,title:"Review outdoor water freeze protection",detail:"Identify vulnerable outdoor water systems and consult equipment instructions or a plumber before freezing weather."},
{id:"fall-drainage",season:"fall",system:"exterior",climates:["all"],priority:2,title:"Observe gutters and drainage from the ground",detail:"Note overflow or blockages; hire qualified help for elevated work."},
{id:"winter-pipes",season:"winter",system:"water",climates:["cold","mixed"],priority:1,title:"Watch for signs of freezing or leaks",detail:"Know how to contact a plumber; never use open flames to thaw pipes."},
{id:"winter-heat",season:"winter",system:"hvac",climates:["all"],priority:1,title:"Record heating performance concerns",detail:"Report unusual odors or behavior to qualified service providers. For suspected gas leaks, leave and contact emergency services."},
{id:"winter-exterior",season:"winter",system:"exterior",climates:["cold","wet","mixed"],priority:2,title:"Observe ice, water and exterior damage from a safe location",detail:"Avoid icy surfaces, roofs and ladders; arrange professional inspection."},
{id:"dry-fire",season:"summer",system:"safety",climates:["dry"],priority:1,title:"Review local wildfire and evacuation guidance",detail:"Check official local alerts and household evacuation plans; no universal clearance distances are assumed."},
{id:"wet-water",season:"fall",system:"water",climates:["wet"],priority:1,title:"Review flood and moisture preparedness",detail:"Check local flood information and emergency plans; do not enter floodwater."}
];
export function buildSeasonalPlan({season,climate,systems}){
 if(!SEASONS.includes(season))throw new RangeError("Choose a valid season.");
 if(!CLIMATES.includes(climate))throw new RangeError("Choose a valid climate condition.");
 if(!Array.isArray(systems)||systems.some(s=>!SYSTEMS.includes(s)))throw new RangeError("Choose valid home systems.");
 const selected=new Set(systems);
 return TASKS.filter(t=>selected.has(t.system)&&(t.season==="all"||t.season===season)&&(t.climates.includes("all")||t.climates.includes(climate)))
 .sort((a,b)=>a.priority-b.priority||a.title.localeCompare(b.title));
}

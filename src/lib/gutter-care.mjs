/** Ground-only visual observation prompts. No diagnosis or roof access. */
export const OBSERVATIONS = Object.freeze([
  {id:"sag",label:"Gutter line looks sagged, separated or damaged",detail:"Note the visible section and arrange a qualified gutter contractor's assessment.",category:"structure"},
  {id:"overflow",label:"Water overflows a gutter during ordinary rain",detail:"Record where and when overflow occurs from a sheltered, safe location; ask a professional to inspect drainage.",category:"rain"},
  {id:"stain",label:"New streaks or damp marks on siding or soffit",detail:"Record the location and seek a qualified assessment if marks persist or spread.",category:"structure"},
  {id:"debris",label:"Leaves or plant growth visible at gutter edge",detail:"Document the location and ask a qualified service about safe clearing; do not reach from a window or ladder.",category:"trees"},
  {id:"downspout",label:"Downspout appears loose, disconnected or damaged",detail:"Note the affected outlet and request an assessment without handling overhead parts.",category:"structure"},
  {id:"pool",label:"Water pools or erodes soil near the foundation",detail:"Photograph from a safe dry spot and ask a drainage professional to evaluate discharge.",category:"rain"},
  {id:"ice",label:"Ice buildup or hanging icicles near roof edge",detail:"Keep people away from falling ice and seek professional assessment; do not chip ice or access the roof.",category:"freeze"}
]);
const IDS=new Set(OBSERVATIONS.map(x=>x.id));
/** @param {{observed?: string[], exposure?: string, date?: string}} [options] */
export function buildGutterPlan({observed=[],exposure="mixed",date=""}={}){
 if(!Array.isArray(observed)||observed.some(x=>typeof x!=="string"||!IDS.has(x))||new Set(observed).size!==observed.length)throw new Error("Select valid, distinct observations.");
 if(!["mixed","trees","rain","freeze"].includes(exposure))throw new Error("Choose a listed exposure.");
 if(date && (!/^\d{4}-\d{2}-\d{2}$/.test(date)||Number.isNaN(Date.parse(date+"T00:00:00Z"))))throw new Error("Enter a valid observation date.");
 const findings=OBSERVATIONS.filter(x=>observed.includes(x.id));
 const extra=exposure==="trees"?"Tree cover can increase debris exposure; review visible edges after leaf fall.":exposure==="rain"?"Heavy rain may reveal overflow and pooling; observe only from safe shelter.":exposure==="freeze"?"Ice and snow can hide defects; wait for safe conditions and use a qualified professional for overhead hazards.":"Weather and house layout vary; observe only when conditions are safe.";
 return {findings,exposureNote:extra,summary:findings.length?findings.length+" observations recorded for professional follow-up.":"No visible concerns recorded. Hidden blockages and damage cannot be ruled out.",date};
}

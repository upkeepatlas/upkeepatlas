/** Climate exposure prompts, not a weather forecast or property assessment. */
export const EXPOSURES = [
 {id:"freeze", label:"Freezing temperatures", priority:1, title:"Review freeze exposure", detail:"From a safe indoor or ground-level position, note exposed plumbing and drafts; consult the plumbing and heating manuals or a qualified professional before freezing weather.", source:"https://www.ready.gov/winter-weather"},
 {id:"rain", label:"Frequent heavy rain", priority:1, title:"Watch drainage and moisture", detail:"From the ground, look for pooling near the foundation, damp interior patches and blocked visible drainage outlets. Arrange qualified help for roof or elevated gutter work.", source:"https://www.ready.gov/floods"},
 {id:"humidity", label:"Persistent humidity", priority:1, title:"Track indoor dampness", detail:"Note condensation, musty odors and visible water intrusion. Check ventilation and equipment guidance; have persistent moisture investigated rather than covering it.", source:"https://www.epa.gov/mold/brief-guide-mold-moisture-and-your-home"},
 {id:"heat", label:"Extended high heat", priority:1, title:"Review cooling readiness", detail:"Confirm the cooling system's maintenance plan and an indoor heat-safety plan. Use manufacturer instructions and qualified service for equipment work.", source:"https://www.ready.gov/heat"},
 {id:"wildfire", label:"Wildfire or smoke exposure", priority:1, title:"Review wildfire and smoke preparedness", detail:"Check local fire-authority guidance, evacuation routes and indoor air guidance. Do not enter hazardous areas or remove vegetation near utility lines yourself.", source:"https://www.ready.gov/wildfires"},
 {id:"wind", label:"Severe wind or storms", priority:1, title:"Review storm exposure", detail:"From a safe location, note loose exterior items and visible tree hazards. Contact qualified professionals for high branches, roof defects or utility-line hazards.", source:"https://www.ready.gov/thunderstorms-lightning"},
 {id:"dry", label:"Dry or dusty conditions", priority:2, title:"Review dust and filter loading", detail:"Check the actual HVAC filter condition and manufacturer's instructions; dusty conditions can change inspection needs. Do not assume a fixed replacement interval.", source:"https://www.energy.gov/energysaver/maintaining-your-air-conditioner"}
];
export const BASELINE = {id:"baseline",label:"All homes",priority:2,title:"Keep a property-specific record",detail:"Record observed changes, dates and service contacts; compare with equipment manuals and local authority guidance.",source:"https://www.energy.gov/cmei/scep/wap/whole-house-weatherization"};
export function selectClimateCare(ids) {
 if (!Array.isArray(ids) || ids.some(x=>typeof x!=="string" || !EXPOSURES.some(e=>e.id===x))) throw new Error("Choose valid conditions.");
 const selected=new Set(ids);
 return [ ...EXPOSURES.filter(x=>selected.has(x.id)).sort((a,b)=>a.priority-b.priority),BASELINE ];
}

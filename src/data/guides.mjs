/** @type {Record<string,{title:string,url:string}>} */
export const sources = {
  epa:{title:"U.S. EPA — A Brief Guide to Mold, Moisture and Your Home",url:"https://www.epa.gov/mold/brief-guide-mold-moisture-and-your-home"},
  energy:{title:"ENERGY STAR — Heat & Cool Efficiently",url:"https://www.energystar.gov/saveathome/heating-cooling"},
  hvac:{title:"ENERGY STAR — HVAC Maintenance Checklist",url:"https://www.energystar.gov/saveathome/heating-cooling/maintenance-checklist"},
  cpsc:{title:"U.S. CPSC — Winter Weather Safety Tips (2026)",url:"https://www.cpsc.gov/Newsroom/News-Releases/2026/CPSC-Issues-Winter-Weather-Safety-Tips-to-Prevent-Fires-and-Carbon-Monoxide-Poisoning"},
  air:{title:"U.S. DOE — Air Sealing Your Home",url:"https://www.energy.gov/energysaver/air-sealing-your-home"}
};
export const guides = [
  {
    slug:"first-year-maintenance-rhythm",
    category:"Getting started",
    minutes:6,
    title:"Finding your first-year home maintenance rhythm",
    description:"Build a manageable first-year home maintenance schedule, learn your home's systems and keep a maintenance log.",
    intro:"Your first year as a homeowner is less about mastering every repair and more about learning your home's systems. Start with a recurring observation routine, a record of equipment and a short list of professional services that apply to your house.",
    sections:[
      {heading:"Start with the house, not a generic list",paragraphs:[
        "Collect your home inspection report, available warranties, appliance manuals and receipts from previous work. Make a short inventory of heating and cooling equipment, water-using appliances, visible drainage arrangements and any exterior responsibilities handled by an HOA or building management.",
        "The useful question is not “what should every homeowner do this month?” but “what does this particular home need me to notice, schedule or document?” A condo owner might not be responsible for exterior gutters; a house without central HVAC won't need central-system filter reminders."
      ]},
      {heading:"Build three kinds of reminders",paragraphs:[
        "Observation: look for unexpected moisture, damage or changes. Routine: simple recurring care, such as reviewing the condition of an accessible filter. Professional: qualified servicing of systems or problems outside your skills. Separate these categories to make your plan easier to follow.",
        "For heating and cooling systems, ENERGY STAR recommends regular filter checks and qualified pre-season maintenance. Follow the manufacturer and service provider's recommendations rather than treating an example schedule as a universal rule."
      ],sourceIds:["energy","hvac"]},
      {heading:"Use an ordinary maintenance log",paragraphs:[
        "For each item, write down the date, what you observed, which equipment was involved, who carried out the work, the next suggested check and any linked receipt or photo. A simple spreadsheet or paper notebook is enough. You can also keep warranty records and service contact details in one place.",
        "If a situation changes suddenly—especially active water intrusion, an alarming electrical smell or a safety-alarm issue—treat it as a separate priority rather than waiting for the next calendar reminder."
      ],sourceIds:["epa","cpsc"]},
      {heading:"Keep the schedule small enough to follow",paragraphs:[
        "Begin with a ten-minute monthly walk-through, add a few genuinely seasonal tasks and revisit your plan after several months. There is no award for collecting more reminders than you can use.",
        "The Upkeep Atlas planner is an organizational starting point. It cannot inspect your house, assess local building rules, replace equipment instructions or determine that a risky repair is suitable for DIY."
      ]}
    ],
    sources:["energy","hvac","epa","cpsc"]
  },
  {
    slug:"spotting-moisture-early",
    category:"Home health",
    minutes:5,
    title:"How to notice moisture problems before they spread",
    description:"Know where to look for common moisture warning signs, how to record a leak and when to consult a professional.",
    intro:"Water problems are easier to manage when you notice them early. Make a habit of checking a few accessible places around plumbing, appliances and windows, and respond promptly to leaks rather than covering up the marks.",
    sections:[
      {heading:"Look where water is likely to appear",paragraphs:[
        "Check accessible spaces under sinks, around toilets, near water-using appliances and at window frames. Watch for new staining, damp patches, peeling finishes, musty smells or persistent condensation. Pay attention to areas that were repaired previously.",
        "Outside, observe whether water pools against the building after rain and whether downspouts visibly overflow. Look from a safe ground-level position; climbing ladders or inspecting a roof is a separate job for an appropriately qualified person."
      ],sourceIds:["epa"]},
      {heading:"Solve the source, not the symptom",paragraphs:[
        "The U.S. Environmental Protection Agency explains that controlling moisture is key to controlling indoor mold. Promptly address leaks and dry wet materials. Painting or caulking over a wet area will not solve the underlying water problem.",
        "EPA notes that drying wet materials within roughly 24–48 hours of a leak or spill can often help prevent mold from growing. Treat that as a reason to act promptly, not a guarantee that any specific material is safe after drying."
      ],sourceIds:["epa"]},
      {heading:"Recognize when help is needed",paragraphs:[
        "If water is entering rapidly, the affected area is extensive, the water may be contaminated, materials are hidden behind walls or serious electrical hazards may exist, consult qualified help. Never touch potentially energized wet appliances or disturb suspected hazardous building materials.",
        "Take dated photographs from a safe position. A simple record of where and when the issue appeared can help a professional identify recurring patterns. Do not attempt invasive removal or mold remediation based on a general online checklist."
      ],sourceIds:["epa","cpsc"]},
      {heading:"Build a one-minute habit",paragraphs:[
        "Choose the same day each month to look under a few fixtures and glance at windows. Record unusual changes rather than waiting until a stain becomes large. A repeated observation is often more useful than an elaborate schedule you never revisit.",
        "Humidity, rainfall, plumbing and building design vary. Adapt your checks to the conditions in your particular home and the advice of qualified local professionals."
      ]}
    ],
    sources:["epa","cpsc"]
  }
];

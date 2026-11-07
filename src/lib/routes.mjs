export const PUBLIC_ROUTES=[
  "/",
  "/maintenance-calendar/",
  "/calculators/",
  "/calculators/paint-coverage/",
  "/checklists/",
  "/checklists/first-year-home-maintenance/",
  "/checklists/seasonal-home-care/",
  "/guides/",
  "/guides/first-year-maintenance-rhythm/",
  "/guides/spotting-moisture-early/",
  "/guides/hvac-filter-routine/",
  "/about/",
  "/editorial-policy/",
  "/privacy/"
];
export function publishedOrigin(value){
  const origin=value?.trim().replace(/\/$/,"");
  return origin && /^https:\/\/[a-z0-9.-]+(?::[0-9]+)?$/i.test(origin) ? origin : "";
}

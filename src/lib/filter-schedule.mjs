/** Date-only UTC arithmetic avoids daylight-saving shifts. Intervals are user supplied, never inferred. */
export function nextInspection(date, days) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new RangeError("Enter a valid ISO date.");
  const [y,m,d] = date.split("-").map(Number);
  const start = new Date(Date.UTC(y,m-1,d));
  if (start.getUTCFullYear()!==y || start.getUTCMonth()!==m-1 || start.getUTCDate()!==d || y<2000 || y>2099) throw new RangeError("Invalid date.");
  if (!Number.isInteger(days) || days<1 || days>365) throw new RangeError("Inspection interval must be 1–365 days.");
  const end = new Date(start.getTime()+days*86400000);
  if (end.getUTCFullYear()>2100) throw new RangeError("Date exceeds supported range.");
  return end.toISOString().slice(0,10);
}
export function inspectionDates(date, days, count=6) {
  if (!Number.isInteger(count) || count<1 || count>24) throw new RangeError("Invalid count.");
  const dates=[];let current=date;
  for(let i=0;i<count;i++){current=nextInspection(current,days);dates.push(current);}
  return dates;
}

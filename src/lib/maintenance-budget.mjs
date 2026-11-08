/** User-defined savings scenarios, not predicted maintenance prices. */
export function maintenanceBudget({homeValue, lowPercent, targetPercent, highPercent, annualSpend, currentReserve}) {
  const numbers = [homeValue,lowPercent,targetPercent,highPercent,annualSpend,currentReserve];
  if (numbers.some(v => typeof v !== "number" || !Number.isFinite(v))) throw new RangeError("Enter valid numbers in every field.");
  if (homeValue <= 0 || homeValue > 100000000) throw new RangeError("Home value must be greater than $0 and at most $100 million.");
  if (lowPercent < 0.1 || highPercent > 20 || !(lowPercent <= targetPercent && targetPercent <= highPercent)) throw new RangeError("Choose ordered rates between 0.1% and 20%.");
  if (annualSpend < 0 || annualSpend > 100000000 || currentReserve < 0 || currentReserve > 100000000) throw new RangeError("Existing annual spending and reserve must be nonnegative and at most $100 million.");
  const annual = p => homeValue * p / 100;
  const low = annual(lowPercent), target = annual(targetPercent), high = annual(highPercent);
  return {
    low, target, high,
    monthlyLow: low / 12, monthlyTarget: target / 12, monthlyHigh: high / 12,
    annualSpend, currentReserve,
    // This is the difference between a target and planned annual spend, not a second required bill.
    additionalTarget: Math.max(0, target - annualSpend),
    // Optional first-year funding if starting from an existing reserve.
    firstYearGap: Math.max(0, target - currentReserve),
    firstYearMonthlyGap: Math.max(0, target - currentReserve) / 12
  };
}

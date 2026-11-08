/** Estimated variable electricity usage; not a utility-bill prediction. */
export function estimateApplianceElectricity({watts=100, hoursPerDay=4, daysPerWeek=7, ratePerKwh=0.20, dutyPercent=100}={}) {
  const values={watts,hoursPerDay,daysPerWeek,ratePerKwh,dutyPercent};
  for(const [name,value] of Object.entries(values)){
    if(typeof value!=="number" || !Number.isFinite(value)) throw new RangeError(name+" must be a finite number.");
  }
  if(watts<=0||watts>100000||hoursPerDay<0||hoursPerDay>24||daysPerWeek<0||daysPerWeek>7||ratePerKwh<0||ratePerKwh>10||dutyPercent<0||dutyPercent>100)
    throw new RangeError("Enter watts (0–100,000, above zero), hours (0–24), days (0–7), rate ($0–$10/kWh) and load (0–100%).");
  const weeklyKwh=(watts/1000)*hoursPerDay*daysPerWeek*(dutyPercent/100);
  const annualKwh=weeklyKwh*52;
  return {weeklyKwh,annualKwh,monthlyKwh:annualKwh/12,annualCost:annualKwh*ratePerKwh,monthlyCost:annualKwh*ratePerKwh/12};
}

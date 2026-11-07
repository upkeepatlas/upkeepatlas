/**
 * Paint estimator: rectangular room walls only, not ceilings/trim.
 * All dimensions in feet, area in sq ft, coverage in sq ft/gallon.
 */
export function estimatePaint({length=12,width=12,height=8,openings=40,coats=2,coverage=350,waste=10}={}) {
  const values={length,width,height,openings,coats,coverage,waste};
  for(const [name,value] of Object.entries(values)){
    if(typeof value!=="number" || !Number.isFinite(value)) throw new RangeError(name+" must be a finite number");
  }
  if(length<=0 || width<=0 || height<=0 || length>500 || width>500 || height>100) throw new RangeError("Room dimensions must be positive and realistic");
  if(openings<0 || coverage<=0 || coverage>2000 || coats<1 || coats>8 || !Number.isInteger(coats) || waste<0 || waste>50) throw new RangeError("Check openings, coats, coverage and waste allowance");
  const grossWallArea=2*(length+width)*height;
  if(openings>=grossWallArea) throw new RangeError("Openings must be smaller than the total wall area");
  const paintableArea=grossWallArea-openings;
  const gallonsExact=paintableArea*coats*(1+waste/100)/coverage;
  return {grossWallArea,paintableArea,gallonsExact,gallonsToBuy:Math.ceil(gallonsExact)};
}

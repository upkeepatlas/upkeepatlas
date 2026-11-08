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

/**
 * Enhanced estimator. Rectangular-room walls and measured segments are
 * mutually exclusive; never add the rectangle to manually entered segments.
 * Ceiling and trim are separate product buckets, rounded independently.
 */
export function estimatePaintProject(options={}) {
  const {mode="room",segments=[],includeCeiling=false,ceilingCoats=1,
    ceilingCoverage=350,trimArea=0,trimCoats=2,trimCoverage=350,...room}=options;
  const wall=mode==="room" ? estimatePaint(room) : (() => {
    if(mode!=="segments" || !Array.isArray(segments) || segments.length<1 || segments.length>20)
      throw new RangeError("Choose a room or 1–20 measured wall segments");
    let grossWallArea=0,openings=0;
    for(const segment of segments) {
      const {length,height,openings:cutout=0}=segment;
      if(![length,height,cutout].every(x=>typeof x==="number"&&Number.isFinite(x)) ||
        length<=0 || length>500 || height<=0 || height>100 || cutout<0 ||
        cutout>=length*height) throw new RangeError("Check each wall segment and its openings");
      grossWallArea+=length*height;
      openings+=cutout;
    }
    // Reuse the same coats, coverage, waste validation as the room estimator.
    const {coats=2,coverage=350,waste=10}=room;
    if(!Number.isInteger(coats)||coats<1||coats>8||!Number.isFinite(coverage)||
       coverage<=0||coverage>2000||!Number.isFinite(waste)||waste<0||waste>50)
       throw new RangeError("Check coats, coverage and waste allowance");
    const paintableArea=grossWallArea-openings;
    const gallonsExact=paintableArea*coats*(1+waste/100)/coverage;
    return {grossWallArea,paintableArea,gallonsExact,gallonsToBuy:Math.ceil(gallonsExact)};
  })();
  const {length=12,width=12,waste=10}=room;
  function extra(area,coats,coverage,label) {
    if(![area,coats,coverage].every(x=>typeof x==="number"&&Number.isFinite(x))||
      area<0||area>250000||!Number.isInteger(coats)||coats<1||coats>8||
      coverage<=0||coverage>2000) throw new RangeError("Check "+label+" measurements and coverage");
    const gallonsExact=area*coats*(1+waste/100)/coverage;
    return {area,gallonsExact,gallonsToBuy:Math.ceil(gallonsExact),
      quartsToBuy:Math.ceil(gallonsExact*4-1e-10)};
  }
  if(mode==="segments" && includeCeiling)
    throw new RangeError("Ceiling requires rectangular room dimensions; calculate separately for irregular rooms");
  const ceiling=extra(includeCeiling?length*width:0,ceilingCoats,ceilingCoverage,"ceiling");
  const trim=extra(trimArea,trimCoats,trimCoverage,"trim");
  return {...wall,wall,ceiling,trim,wallQuartsToBuy:Math.ceil(wall.gallonsExact*4-1e-10)};
}

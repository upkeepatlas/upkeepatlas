/** Geometric material estimate only. 1 US fl oz = 231/128 cubic inches. */
export function estimateCaulk({lengthFeet=50,widthInches=0.25,depthInches=0.25,tubeFluidOunces=10.1,wastePercent=10,shape="rectangular"}={}) {
 const vals=[lengthFeet,widthInches,depthInches,tubeFluidOunces,wastePercent];
 if(vals.some(v=>typeof v!=="number"||!Number.isFinite(v))) throw new RangeError("Enter finite numbers in every field.");
 if(lengthFeet<=0||lengthFeet>100000||widthInches<=0||widthInches>4||depthInches<=0||depthInches>4||tubeFluidOunces<=0||tubeFluidOunces>128||wastePercent<0||wastePercent>100) throw new RangeError("Check the positive dimensions, package volume and 0–100% allowance.");
 if(!["rectangular","triangular"].includes(shape)) throw new RangeError("Choose a supported bead profile.");
 const shapeFactor=shape==="triangular"?0.5:1;
 const areaSquareInches=widthInches*depthInches*shapeFactor;
 const volumeCubicInches=lengthFeet*12*areaSquareInches;
 const adjustedCubicInches=volumeCubicInches*(1+wastePercent/100);
 const tubeCubicInches=tubeFluidOunces*231/128;
 const exactTubes=adjustedCubicInches/tubeCubicInches;
 return {areaSquareInches,volumeCubicInches,adjustedCubicInches,tubeCubicInches,exactTubes,tubesToBuy:Math.ceil(exactTubes),feetPerTube:tubeCubicInches/(12*areaSquareInches),fluidOuncesNeeded:adjustedCubicInches*128/231};
}

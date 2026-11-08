import test from "node:test";import assert from "node:assert/strict";import {normalizeInventoryItem,inventorySummary,inventoryCsv} from "../src/lib/home-inventory.mjs";
const item={room:"Kitchen",name:"Mixer",quantity:"2",value:"125.50",brand:"Example",year:"2024",proof:"Receipt"};
test("normalizes valid inventory and computes known-value total",()=>{const a=normalizeInventoryItem(item);assert.equal(inventorySummary([a]).knownValue,251);assert.equal(inventorySummary([a]).units,2);});
test("unpriced items are excluded rather than valued at zero",()=>{const a=normalizeInventoryItem({...item,value:""});assert.equal(a.value,null);assert.equal(inventorySummary([a]).unpriced,1);});
test("rejects invalid quantities, years, and prices",()=>{for(const patch of [{quantity:0},{quantity:1.2},{year:1800},{value:-1},{value:"NaN"},{value:"1.234"}])assert.throws(()=>normalizeInventoryItem({...item,...patch}));});
test("CSV quotes fields and neutralizes formula-leading cells",()=>{const csv=inventoryCsv([normalizeInventoryItem({...item,name:'=HYPERLINK("bad")'})]);assert.match(csv,/'=HYPERLINK/);assert.match(csv,/""bad""/);assert.match(csv,/\r\n/);});

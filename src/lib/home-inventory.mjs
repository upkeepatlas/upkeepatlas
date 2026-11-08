const rooms=new Set(["Living room","Kitchen","Bedroom","Bathroom","Home office","Garage / storage","Other"]);
const proofs=new Set(["","Photo","Receipt","Both"]);
function text(v,max){return String(v??"").trim().slice(0,max);}
export function normalizeInventoryItem(raw){
 if(!raw||typeof raw!=="object")throw new Error("Invalid inventory entry.");
 const room=text(raw.room,40),name=text(raw.name,100),brand=text(raw.brand,100),proof=text(raw.proof,20);
 if(!rooms.has(room)||!name||!proofs.has(proof))throw new Error("Choose a room and enter an item description.");
 const quantity=Number(raw.quantity);
 if(!Number.isInteger(quantity)||quantity<1||quantity>9999)throw new Error("Quantity must be a whole number from 1 to 9,999.");
 const year=raw.year==null||raw.year===""?"":String(raw.year);
 if(year!==""&&(!/^\d{4}$/.test(year)||Number(year)<1900||Number(year)>2100))throw new Error("Enter a four-digit purchase year or leave it blank.");
 const value=raw.value==null||raw.value===""?null:Number(raw.value);
 if(value!==null&&(!Number.isFinite(value)||value<0||value>100000000||Math.round(value*100)!==value*100))throw new Error("Price must be a nonnegative amount with at most two decimal places.");
 return {room,name,brand,quantity,year,value,proof};
}
export function inventorySummary(entries){
 const cents=entries.reduce((sum,e)=>sum+(e.value===null?0:Math.round(e.value*100)*e.quantity),0);
 return {count:entries.length,units:entries.reduce((sum,e)=>sum+e.quantity,0),knownValue:cents/100,unpriced:entries.filter(e=>e.value===null).length};
}
function cell(value){let s=String(value??"");if(/^[\s]*[=+@\-\t\r]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"';}
export function inventoryCsv(entries){const header=["Room","Item","Brand or model","Quantity","Purchase year","Estimated replacement price USD per unit","Proof recorded"];return [header,...entries.map(e=>[e.room,e.name,e.brand,e.quantity,e.year,e.value===null?"":e.value.toFixed(2),e.proof])].map(row=>row.map(cell).join(",")).join("\r\n")+"\r\n";}

export const COLUMNS = ["date","system","work","status","cost","notes"];
export function validDate(value){
 if(!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
 const d=new Date(value+"T12:00:00Z");
 return Number.isFinite(d.getTime())&&d.toISOString().slice(0,10)===value;
}
export function normalizeRecord(input){
 if(!input||typeof input!=="object")throw new Error("Invalid record.");
 const date=String(input.date??"").trim();
 const system=String(input.system??"").trim();
 const work=String(input.work??"").trim();
 const status=String(input.status??"").trim();
 const notes=String(input.notes??"").trim();
 const raw=String(input.cost??"").trim();
 if(!validDate(date))throw new Error("Enter a valid date.");
 if(!system||system.length>80||!work||work.length>240||notes.length>500)throw new Error("System and work are required; shorten long entries.");
 if(!["completed","planned","follow-up"].includes(status))throw new Error("Choose a valid status.");
 if(raw!==""&&(!/^(?:\d+)(?:\.\d{1,2})?$/.test(raw)||Number(raw)>100000000))throw new Error("Cost must be blank or a nonnegative dollar amount up to 100,000,000.");
 return {date,system,work,status,cost:raw,notes};
}
function csvCell(value){
 const str=String(value??"");
 // A leading spreadsheet formula character must remain literal on import.
 const safe=/^[\s\u0000-\u001f]*[=+@\-]/.test(str)?"'"+str:str;
 return '"'+safe.replaceAll('"','""')+'"';
}
export function exportCsv(records){
 return [COLUMNS.join(","),...records.map(row=>COLUMNS.map(k=>csvCell(row[k])).join(","))].join("\r\n")+"\r\n";
}
export function parseCsv(text){
 if(typeof text!=="string"||text.length>1000000)throw new Error("CSV must be under 1 MB.");
 const rows=[];let row=[],field="",quoted=false,closed=false;
 for(let i=0;i<text.length;i++){
  const ch=text[i];
  if(quoted){if(ch==='"'&&text[i+1]==='"'){field+='"';i++;}else if(ch==='"'){quoted=false;closed=true;}else field+=ch;}
  else if(ch==='"'&&!field&&!closed)quoted=true;
  else if(ch===','||ch==='\n'||ch==='\r'){
   row.push(field);field="";closed=false;
   if(ch!==','){if(row.some(v=>v!==""))rows.push(row);row=[];if(ch==='\r'&&text[i+1]==='\n')i++;}
  }else if(closed)throw new Error("Malformed CSV quoting.");
  else field+=ch;
 }
 if(quoted)throw new Error("Unclosed CSV quote.");
 if(field||row.length){row.push(field);rows.push(row);}
 if(rows.length===0||rows[0].join(",")!==COLUMNS.join(","))throw new Error("CSV header must be date,system,work,status,cost,notes.");
 if(rows.length>501)throw new Error("Maximum 500 records per import.");
 return rows.slice(1).map((values,i)=>{if(values.length!==COLUMNS.length)throw new Error("Invalid columns on row "+(i+2));return normalizeRecord(Object.fromEntries(COLUMNS.map((k,j)=>[k,values[j]])));});
}

import test from "node:test";
import assert from "node:assert/strict";
import {normalizeRecord,validDate,exportCsv,parseCsv} from "../src/lib/maintenance-log.mjs";
const example={date:"2026-11-08",system:"HVAC",work:"Inspected filter",status:"completed",cost:"12.50",notes:'Quote "receipt", saved\nfor later'};
test("dates reject impossible days and accept leap day",()=>{assert.equal(validDate("2024-02-29"),true);assert.equal(validDate("2025-02-29"),false);assert.equal(validDate("2026-13-01"),false);});
test("validates cost, status, lengths and required fields",()=>{assert.deepEqual(normalizeRecord(example),example);for(const changes of [{cost:"-1"},{cost:"1.234"},{cost:"NaN"},{cost:"100000001"},{status:"unknown"},{work:""},{notes:"x".repeat(501)},{date:"2026-02-30"}])assert.throws(()=>normalizeRecord({...example,...changes}));});
test("CSV roundtrip handles quotes commas and multiline text",()=>{assert.deepEqual(parseCsv(exportCsv([example])),[example]);});
test("CSV rejects invalid header, excessive records and malformed quotes",()=>{assert.throws(()=>parseCsv("wrong,header\n"));assert.throws(()=>parseCsv('date,system,work,status,cost,notes\n"unclosed'));assert.throws(()=>parseCsv(exportCsv(Array(501).fill(example))));});
test("spreadsheet formula injection is escaped on export",()=>{const csv=exportCsv([{...example,work:"=HYPERLINK(1)",notes:"+CMD"}]);assert.match(csv,/'=HYPERLINK/);assert.match(csv,/'\+CMD/);});

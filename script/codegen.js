#!/usr/bin/env node
const fs = require("fs");
const yaml = require("js-yaml");

const schema = yaml.safeLoad(fs.readFileSync(process.cwd() + "/" + process.argv[2]));
const dbType2FlowType = {
  integer: "number",
  datetime: "Date",
  object: "Object",
  arraybuffer: "Array"
};

function exprToCode(props) {
  let code = "{";
  for (const key in props) {
    const val = props[key];
    code += `${key}:`;
    if (val != null && typeof val === "object") {
      code += `${exprToCode(val)};`;
    } else {
      code += `${dbType2FlowType[val] || val};`;
    }
  }
  code += "}";
  return code;
}
const PREFIX = `/* @flow */
`;

let ret = PREFIX;
for (const tableName in schema.table) {
  const table = schema.table[tableName];
  if (!table.properties.id) {
    table.properties.id = "integer";
  }
  ret += `
export type ${tableName} = ${exprToCode(table.properties)};
`;

}
console.log(ret);

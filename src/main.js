import {loadSchema} from "./util/lovefield-helper";
import run from "./run";

const lf = require("lovefield");
const schema = require("../config/schema.yml");

const schemaBuilder = lf.schema.create(schema.name, schema.version);
loadSchema(schema, schemaBuilder);
run(schemaBuilder);

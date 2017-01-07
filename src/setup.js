/* @flow */

if (global.global) {
  global.self = global;
  global.indexedDB = require("fake-indexeddb");
  require("lovefield");
  require("require-yaml");
}

require("./main");

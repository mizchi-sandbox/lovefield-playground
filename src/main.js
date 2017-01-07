/* @flow */
import "./setup";
import {Store, loadSchema} from "./util/lovefield-helper";
import type {User, Item} from "../gen/types";

const lf = require("lovefield");
const schema = require("../config/schema.yml");

const schemaBuilder = lf.schema.create(schema.name, schema.version);
loadSchema(schema, schemaBuilder);

class ItemStore extends Store<Item> {
  constructor(db) {
    super(db, "Item");
  }
}

class UserStore extends Store<User> {
  constructor(db) {
    super(db, "User");
  }
}

let db, itemStore, itemTable;
(async () => {
  db = await schemaBuilder.connect();
  itemStore = new ItemStore(db);
  const userStore = new UserStore(db);
  const users = await userStore.all();
  console.log(users);

  await itemStore.insert({
    title: "aaaa",
    body: ".------.-.-.--.-",
    createdAt: Date.now()
  });
  await itemStore.insert({
    title: "bbb",
    body: ".------.-.-.--.-",
    createdAt: Date.now()
  });

  console.log("insert done");

  itemTable = itemStore.getTable();
  const result1 = await itemStore.all();
  console.log("result1:", result1);

  const result2 = await itemStore.find(1);
  console.log("result2:", result2);

  const result3 = await itemStore.where(itemTable.id.eq(1));
  console.log("result3:", result3);

  await itemStore.delete(1);
  const result4 = await itemStore.all();
  console.log("result4:", result4);
})();

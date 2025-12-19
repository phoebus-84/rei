/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_");

  if (!collection) {
    throw new Error("Users collection not found");
  }

  // Add new fields to the users collection (name and avatar already exist)
  collection.fields.add(new Field({
    "cascadeDelete": false,
    "hidden": false,
    "id": "select_users_type",
    "maxSelect": 1,
    "name": "type",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": ["customer", "agent", "admin"]
  }));

  collection.fields.add(new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text_users_phone",
    "max": 0,
    "min": 0,
    "name": "phone",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }));

  collection.fields.add(new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_properties_001",
    "hidden": false,
    "id": "relation_users_saved",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "saved_properties",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "relation"
  }));

  // Update API rules
  collection.createRule = "@request.auth.id = ''";
  collection.updateRule = "@request.auth.id = id";
  collection.viewRule = "@request.auth.id != ''";

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_");

  if (!collection) {
    return;
  }

  // Remove the added fields
  collection.fields.removeById("select_users_type");
  collection.fields.removeById("text_users_phone");
  collection.fields.removeById("relation_users_saved");

  return app.save(collection);
})

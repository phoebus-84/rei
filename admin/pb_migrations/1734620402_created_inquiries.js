/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "createRule": "@request.auth.id = ''",
    "deleteRule": null,
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "autodate2990389176",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "autodate3332085495",
        "name": "updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "cascadeDelete": false,
        "collectionId": "pbc_properties_001",
        "hidden": false,
        "id": "relation_inquiry_prop",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "property",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "relation"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text_inquiry_cname",
        "max": 0,
        "min": 0,
        "name": "customer_name",
        "pattern": "",
        "presentable": true,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "email_inquiry_cemail",
        "max": 0,
        "min": 0,
        "name": "customer_email",
        "pattern": "^.+@.+\\..+$",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "email"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text_inquiry_cphone",
        "max": 0,
        "min": 0,
        "name": "customer_phone",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text_inquiry_message",
        "max": 0,
        "min": 0,
        "name": "message",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "cascadeDelete": false,
        "hidden": false,
        "id": "select_inquiry_status",
        "maxSelect": 1,
        "name": "status",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "select",
        "values": ["new", "read", "responded"]
      }
    ],
    "id": "pbc_inquiries_001",
    "indexes": [],
    "listRule": "@request.auth.id != '' && (@request.auth.type = 'agent' || @request.auth.type = 'admin')",
    "name": "inquiries",
    "system": false,
    "type": "base",
    "updateRule": "@request.auth.id != '' && @request.auth.type = 'admin'",
    "viewRule": "@request.auth.id != '' && (@request.auth.type = 'agent' || @request.auth.type = 'admin')"
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_inquiries_001");
  return app.delete(collection);
})

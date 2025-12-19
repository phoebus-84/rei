/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "createRule": "@request.auth.id != '' && (@request.auth.type = 'agent' || @request.auth.type = 'admin')",
    "deleteRule": "@request.auth.id != '' && @request.auth.type = 'admin'",
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
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text105650625",
        "max": 0,
        "min": 0,
        "name": "title",
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
        "id": "text1234567890",
        "max": 0,
        "min": 0,
        "name": "slug",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "editor1234567",
        "max": 0,
        "min": 0,
        "name": "description",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "editor"
      },
      {
        "hidden": false,
        "id": "number1234567",
        "name": "price",
        "noDecimal": false,
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "number"
      },
      {
        "cascadeDelete": false,
        "hidden": false,
        "id": "select1234567",
        "maxSelect": 1,
        "name": "status",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "select",
        "values": ["for_sale", "for_rent", "sold", "rented"]
      },
      {
        "cascadeDelete": false,
        "hidden": false,
        "id": "select2234567",
        "maxSelect": 1,
        "name": "property_type",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "select",
        "values": ["house", "apartment", "commercial", "land"]
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text3234567890",
        "max": 0,
        "min": 0,
        "name": "address",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text4234567890",
        "max": 0,
        "min": 0,
        "name": "city",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "number2234567",
        "name": "bedrooms",
        "noDecimal": true,
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "number3234567",
        "name": "bathrooms",
        "noDecimal": true,
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "number4234567",
        "name": "area_sqm",
        "noDecimal": true,
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "file1234567890",
        "max": 10,
        "mimeTypes": ["image/jpeg", "image/png", "image/gif", "image/webp"],
        "name": "images",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "thumbs": null,
        "type": "file"
      },
      {
        "cascadeDelete": false,
        "collectionId": "_pb_users_auth_",
        "hidden": false,
        "id": "relation1234567",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "agent",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "relation"
      },
      {
        "hidden": false,
        "id": "json1234567890",
        "max": 0,
        "min": 0,
        "name": "amenities",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "json"
      },
      {
        "hidden": false,
        "id": "bool1234567890",
        "name": "featured",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "bool"
      }
    ],
    "id": "pbc_properties_001",
    "indexes": ["CREATE UNIQUE INDEX idx_properties_slug on properties (slug)"],
    "listRule": "status != 'empty'",
    "name": "properties",
    "system": false,
    "type": "base",
    "updateRule": "@request.auth.id != '' && @request.auth.type = 'admin'",
    "viewRule": "status != 'empty'"
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_properties_001");
  return app.delete(collection);
})

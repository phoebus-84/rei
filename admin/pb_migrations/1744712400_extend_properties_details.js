/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_properties_001")

  // 1. Spese condominiali
  collection.fields.add(new Field({
    "hidden": false,
    "id": "number_condo_fees",
    "name": "condo_fees",
    "noDecimal": false,
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // 2. Tipo di riscaldamento
  collection.fields.add(new Field({
    "hidden": false,
    "id": "select_heating_type",
    "maxSelect": 1,
    "name": "heating_type",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": ["autonomo", "centralizzato", "a_pavimento", "assente"]
  }))

  // 3. Composizione immobile
  collection.fields.add(new Field({
    "hidden": false,
    "id": "number_rooms",
    "name": "rooms",
    "noDecimal": true,
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  collection.fields.add(new Field({
    "hidden": false,
    "id": "number_kitchens",
    "name": "kitchens",
    "noDecimal": true,
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  collection.fields.add(new Field({
    "hidden": false,
    "id": "number_balconies",
    "name": "balconies",
    "noDecimal": true,
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  collection.fields.add(new Field({
    "hidden": false,
    "id": "bool_has_cellar",
    "name": "has_cellar",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  collection.fields.add(new Field({
    "hidden": false,
    "id": "bool_has_garage",
    "name": "has_garage",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  collection.fields.add(new Field({
    "hidden": false,
    "id": "number_garage_sqm",
    "name": "garage_sqm",
    "noDecimal": true,
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  collection.fields.add(new Field({
    "hidden": false,
    "id": "number_land_sqm",
    "name": "land_sqm",
    "noDecimal": true,
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  collection.fields.add(new Field({
    "hidden": false,
    "id": "bool_has_parking",
    "name": "has_parking",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // 4. Piano e ascensore
  collection.fields.add(new Field({
    "hidden": false,
    "id": "number_floor",
    "name": "floor",
    "noDecimal": true,
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  collection.fields.add(new Field({
    "hidden": false,
    "id": "number_total_floors",
    "name": "total_floors",
    "noDecimal": true,
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  collection.fields.add(new Field({
    "hidden": false,
    "id": "bool_has_elevator",
    "name": "has_elevator",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // 5. Stato immobile
  collection.fields.add(new Field({
    "hidden": false,
    "id": "select_condition",
    "maxSelect": 1,
    "name": "condition",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": ["nuovo", "ristrutturato", "abitabile", "da_ristrutturare"]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_properties_001")

  // Remove all added fields (rollback)
  const fieldsToRemove = [
    "condo_fees", "heating_type",
    "rooms", "kitchens", "balconies",
    "has_cellar", "has_garage", "garage_sqm", "land_sqm", "has_parking",
    "floor", "total_floors", "has_elevator",
    "condition"
  ]

  for (const name of fieldsToRemove) {
    collection.fields.removeByName(name)
  }

  return app.save(collection)
})

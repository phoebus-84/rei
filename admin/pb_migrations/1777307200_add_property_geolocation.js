/// <reference path="../pb_data/types.d.ts" />
migrate(
	(app) => {
		const collection = app.findCollectionByNameOrId('pbc_properties_001');

		collection.fields.add(
			new Field({
				hidden: false,
				id: 'number_latitude',
				name: 'latitude',
				noDecimal: false,
				presentable: false,
				primaryKey: false,
				required: false,
				system: false,
				type: 'number'
			})
		);

		collection.fields.add(
			new Field({
				hidden: false,
				id: 'number_longitude',
				name: 'longitude',
				noDecimal: false,
				presentable: false,
				primaryKey: false,
				required: false,
				system: false,
				type: 'number'
			})
		);

		collection.fields.add(
			new Field({
				autogeneratePattern: '',
				hidden: false,
				id: 'text_location_label',
				max: 0,
				min: 0,
				name: 'location_label',
				pattern: '',
				presentable: false,
				primaryKey: false,
				required: false,
				system: false,
				type: 'text'
			})
		);

		collection.fields.add(
			new Field({
				hidden: false,
				id: 'number_location_osm_id',
				name: 'location_osm_id',
				noDecimal: true,
				presentable: false,
				primaryKey: false,
				required: false,
				system: false,
				type: 'number'
			})
		);

		collection.fields.add(
			new Field({
				autogeneratePattern: '',
				hidden: false,
				id: 'text_location_osm_type',
				max: 1,
				min: 0,
				name: 'location_osm_type',
				pattern: '^[NWR]?$',
				presentable: false,
				primaryKey: false,
				required: false,
				system: false,
				type: 'text'
			})
		);

		collection.fields.add(
			new Field({
				hidden: false,
				id: 'json_location_raw',
				max: 0,
				min: 0,
				name: 'location_raw',
				presentable: false,
				primaryKey: false,
				required: false,
				system: false,
				type: 'json'
			})
		);

		collection.fields.add(
			new Field({
				hidden: false,
				id: 'date_location_geocoded_at',
				max: '',
				min: '',
				name: 'location_geocoded_at',
				presentable: false,
				required: false,
				system: false,
				type: 'date'
			})
		);

		collection.indexes = [
			...collection.indexes,
			'CREATE INDEX idx_properties_latitude_longitude on properties (latitude, longitude)'
		];

		return app.save(collection);
	},
	(app) => {
		const collection = app.findCollectionByNameOrId('pbc_properties_001');

		for (const name of [
			'latitude',
			'longitude',
			'location_label',
			'location_osm_id',
			'location_osm_type',
			'location_raw',
			'location_geocoded_at'
		]) {
			collection.fields.removeByName(name);
		}

		collection.indexes = collection.indexes.filter(
			(index) => !index.includes('idx_properties_latitude_longitude')
		);

		return app.save(collection);
	}
);

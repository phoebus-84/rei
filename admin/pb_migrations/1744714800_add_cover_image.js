/// <reference path="../pb_data/types.d.ts" />

migrate(
	(app) => {
		const collection = app.findCollectionByNameOrId('pbc_properties_001');

		collection.fields.add(
			new Field({
				system: false,
				id: 'text_cover_image',
				name: 'cover_image',
				type: 'text',
				required: false,
				presentable: false,
				unique: false,
				options: {
					min: null,
					max: null,
					pattern: ''
				}
			})
		);

		app.save(collection);
	},
	(app) => {
		const collection = app.findCollectionByNameOrId('pbc_properties_001');
		collection.fields.removeByName('cover_image');
		app.save(collection);
	}
);

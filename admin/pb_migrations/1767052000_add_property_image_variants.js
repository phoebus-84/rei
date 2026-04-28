/// <reference path="../pb_data/types.d.ts" />

migrate(
	(app) => {
		const collection = app.findCollectionByNameOrId('pbc_properties_001');

		collection.fields.add(
			new Field({
				hidden: false,
				id: 'filethumbwebp01',
				maxSelect: 99,
				maxSize: 0,
				mimeTypes: ['image/webp'],
				name: 'images_thumb_webp',
				presentable: false,
				protected: false,
				required: false,
				system: false,
				thumbs: null,
				type: 'file'
			})
		);

		collection.fields.add(
			new Field({
				hidden: false,
				id: 'filecardwebp01',
				maxSelect: 99,
				maxSize: 0,
				mimeTypes: ['image/webp'],
				name: 'images_card_webp',
				presentable: false,
				protected: false,
				required: false,
				system: false,
				thumbs: null,
				type: 'file'
			})
		);

		collection.fields.add(
			new Field({
				hidden: false,
				id: 'fileherowebp01',
				maxSelect: 99,
				maxSize: 0,
				mimeTypes: ['image/webp'],
				name: 'images_hero_webp',
				presentable: false,
				protected: false,
				required: false,
				system: false,
				thumbs: null,
				type: 'file'
			})
		);

		collection.fields.add(
			new Field({
				autogeneratePattern: '',
				hidden: false,
				id: 'textimgalt001',
				max: 160,
				min: 0,
				name: 'image_alt',
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
				autogeneratePattern: '',
				hidden: false,
				id: 'textimgtitle1',
				max: 120,
				min: 0,
				name: 'image_title',
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
				autogeneratePattern: '',
				hidden: false,
				id: 'textimgcap001',
				max: 220,
				min: 0,
				name: 'image_caption',
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
				id: 'jsonimgmeta001',
				max: 0,
				min: 0,
				name: 'image_metadata',
				presentable: false,
				required: false,
				system: false,
				type: 'json'
			})
		);

		return app.save(collection);
	},
	(app) => {
		const collection = app.findCollectionByNameOrId('pbc_properties_001');

		collection.fields.removeByName('images_thumb_webp');
		collection.fields.removeByName('images_card_webp');
		collection.fields.removeByName('images_hero_webp');
		collection.fields.removeByName('image_alt');
		collection.fields.removeByName('image_title');
		collection.fields.removeByName('image_caption');
		collection.fields.removeByName('image_metadata');

		return app.save(collection);
	}
);

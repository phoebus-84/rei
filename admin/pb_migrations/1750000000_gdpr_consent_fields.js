/// <reference path="../pb_data/types.d.ts" />

migrate(
	(app) => {
		const collection = app.findCollectionByNameOrId('pbc_inquiries_001');

		// Add privacy_accepted (bool, required for new records)
		collection.fields.add(
			new Field({
				system: false,
				id: 'bool_privacy_accepted',
				name: 'privacy_accepted',
				type: 'bool',
				required: false,
				presentable: false,
				unique: false
			})
		);

		// Add privacy_accepted_at (autodate, set on create)
		collection.fields.add(
			new Field({
				system: false,
				id: 'autodate_privacy_accepted_at',
				name: 'privacy_accepted_at',
				type: 'autodate',
				required: false,
				presentable: false,
				unique: false,
				onCreate: true,
				onUpdate: false
			})
		);

		// Add privacy_policy_version (text)
		collection.fields.add(
			new Field({
				system: false,
				id: 'text_privacy_policy_version',
				name: 'privacy_policy_version',
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

		// Enable admin deletion for GDPR Right to Erasure (Art. 17)
		collection.deleteRule = "@request.auth.id != '' && @request.auth.type = 'admin'";

		app.save(collection);
	},
	(app) => {
		const collection = app.findCollectionByNameOrId('pbc_inquiries_001');
		collection.fields.removeByName('privacy_accepted');
		collection.fields.removeByName('privacy_accepted_at');
		collection.fields.removeByName('privacy_policy_version');
		collection.deleteRule = null;
		app.save(collection);
	}
);

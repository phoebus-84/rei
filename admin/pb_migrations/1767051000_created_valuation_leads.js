/// <reference path="../pb_data/types.d.ts" />
migrate(
	(app) => {
		const collection = new Collection({
			createRule: null,
			deleteRule: "@request.auth.id != '' && @request.auth.type = 'admin'",
			fields: [
				{
					autogeneratePattern: '[a-z0-9]{15}',
					hidden: false,
					id: 'text3208210256',
					max: 15,
					min: 15,
					name: 'id',
					pattern: '^[a-z0-9]+$',
					presentable: false,
					primaryKey: true,
					required: true,
					system: true,
					type: 'text'
				},
				{
					hidden: false,
					id: 'autodate2990389176',
					name: 'created',
					onCreate: true,
					onUpdate: false,
					presentable: false,
					system: false,
					type: 'autodate'
				},
				{
					hidden: false,
					id: 'autodate3332085495',
					name: 'updated',
					onCreate: true,
					onUpdate: true,
					presentable: false,
					system: false,
					type: 'autodate'
				},
				{
					hidden: false,
					id: 'jsonvaluation001',
					max: 0,
					min: 0,
					name: 'property_data',
					presentable: false,
					primaryKey: false,
					required: true,
					system: false,
					type: 'json'
				},
				{
					onlyInt: false,
					hidden: false,
					id: 'numbervalmin01',
					max: null,
					min: 0,
					name: 'price_min',
					presentable: false,
					required: true,
					system: false,
					type: 'number'
				},
				{
					onlyInt: false,
					hidden: false,
					id: 'numbervalmax01',
					max: null,
					min: 0,
					name: 'price_max',
					presentable: false,
					required: true,
					system: false,
					type: 'number'
				},
				{
					onlyInt: false,
					hidden: false,
					id: 'numbervalfin01',
					max: null,
					min: 0,
					name: 'price_final',
					presentable: false,
					required: true,
					system: false,
					type: 'number'
				},
				{
					autogeneratePattern: '',
					hidden: false,
					id: 'textcurrency001',
					max: 3,
					min: 3,
					name: 'currency',
					pattern: '^[A-Z]{3}$',
					presentable: false,
					primaryKey: false,
					required: true,
					system: false,
					type: 'text'
				},
				{
					autogeneratePattern: '',
					hidden: false,
					id: 'textfullname001',
					max: 0,
					min: 1,
					name: 'full_name',
					pattern: '',
					presentable: true,
					primaryKey: false,
					required: true,
					system: false,
					type: 'text'
				},
				{
					autogeneratePattern: '',
					hidden: false,
					id: 'emailleadmail01',
					max: 0,
					min: 0,
					name: 'email',
					pattern: '^.+@.+\\..+$',
					presentable: false,
					primaryKey: false,
					required: true,
					system: false,
					type: 'email'
				},
				{
					autogeneratePattern: '',
					hidden: false,
					id: 'textleadphone01',
					max: 0,
					min: 1,
					name: 'phone',
					pattern: '',
					presentable: false,
					primaryKey: false,
					required: true,
					system: false,
					type: 'text'
				},
				{
					hidden: false,
					id: 'boolconsent001',
					name: 'consent_given',
					presentable: false,
					primaryKey: false,
					required: true,
					system: false,
					type: 'bool'
				},
				{
					hidden: false,
					id: 'dateconsent001',
					max: '',
					min: '',
					name: 'consent_timestamp',
					presentable: false,
					primaryKey: false,
					required: true,
					system: false,
					type: 'date'
				},
				{
					autogeneratePattern: '',
					hidden: false,
					id: 'textprivacy001',
					max: 0,
					min: 1,
					name: 'privacy_version',
					pattern: '',
					presentable: false,
					primaryKey: false,
					required: true,
					system: false,
					type: 'text'
				},
				{
					autogeneratePattern: '',
					hidden: false,
					id: 'textlocale0001',
					max: 5,
					min: 2,
					name: 'locale',
					pattern: '^[a-z]{2}(-[A-Z]{2})?$',
					presentable: false,
					primaryKey: false,
					required: true,
					system: false,
					type: 'text'
				},
				{
					hidden: false,
					id: 'jsonutmvalue001',
					max: 0,
					min: 0,
					name: 'utm',
					presentable: false,
					primaryKey: false,
					required: false,
					system: false,
					type: 'json'
				},
				{
					hidden: false,
					id: 'selectstatus001',
					maxSelect: 1,
					name: 'status',
					presentable: false,
					primaryKey: false,
					required: true,
					system: false,
					type: 'select',
					values: ['new', 'contacted', 'closed']
				},
				{
					autogeneratePattern: '',
					hidden: false,
					id: 'textleadnotes01',
					max: 0,
					min: 0,
					name: 'notes',
					pattern: '',
					presentable: false,
					primaryKey: false,
					required: false,
					system: false,
					type: 'text'
				},
				{
					autogeneratePattern: '',
					hidden: false,
					id: 'textsourceurl01',
					max: 0,
					min: 0,
					name: 'source_url',
					pattern: '',
					presentable: false,
					primaryKey: false,
					required: false,
					system: false,
					type: 'text'
				},
				{
					autogeneratePattern: '',
					hidden: false,
					id: 'textiphash0001',
					max: 0,
					min: 0,
					name: 'ip_hash',
					pattern: '',
					presentable: false,
					primaryKey: false,
					required: false,
					system: false,
					type: 'text'
				}
			],
			id: 'pbc_valuation_001',
			indexes: [
				'CREATE INDEX idx_valuation_leads_created ON valuation_leads (created)',
				'CREATE INDEX idx_valuation_leads_status ON valuation_leads (status)',
				'CREATE INDEX idx_valuation_leads_email ON valuation_leads (email)'
			],
			listRule: "@request.auth.id != '' && @request.auth.type = 'admin'",
			name: 'valuation_leads',
			system: false,
			type: 'base',
			updateRule: "@request.auth.id != '' && @request.auth.type = 'admin'",
			viewRule: "@request.auth.id != '' && @request.auth.type = 'admin'"
		});

		return app.save(collection);
	},
	(app) => {
		const collection = app.findCollectionByNameOrId('pbc_valuation_001');
		return app.delete(collection);
	}
);

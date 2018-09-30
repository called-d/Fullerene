import lf from './../../../../node_modules/lovefield/dist/lovefield.es6'

// TODO for debug
window.lf = lf

export default class {
    schemaBuild(dbName, dbVersion) {
        let schemaBuilder = lf.schema.create(dbName, dbVersion)
        schemaBuilder.createTable('items')
            .addColumn('name', lf.Type.STRING)
            .addColumn('description', lf.Type.STRING)
            .addNullable(['description'])
            .addPrimaryKey(['name'], false)
        schemaBuilder.createTable('refs')
            .addColumn('item_name', lf.Type.STRING)
            .addColumn('ref_name', lf.Type.STRING)
            .addColumn('is_tag', lf.Type.BOOLEAN)
            .addColumn('is_parent', lf.Type.BOOLEAN) // PARENT: ref, item: CHILD
            .addIndex('fullerene_default_refs_name_idx', ['item_name'])
            .addIndex('fullerene_default_refs_ref_idx', ['ref_name', 'is_parent'])
            .addPrimaryKey(['item_name', 'ref_name'], false)
            /*.addForeignKey('fullerene_default_refs_fk', {
                local: 'item_name',
                ref: 'items.name'
            })*/
        return schemaBuilder
    }

    reinit(db) {
        this._db = db
        let schema = db.getSchema()
        this._items = schema.table('items')
        this._refs = schema.table('refs')
    }

    constructor(dbName, dbVersion) {
        let schemaBuilder = this.schemaBuild(`default_${new Date().getTime()}`, 1)

        schemaBuilder.connect({
            storeType: lf.schema.DataStoreType.MEMORY // TODO まずはこれ
        }).then((db) => this.reinit(db))
    }

    newItem(name, description = null, parent = null) {
        // TODO if item exists
        let item = this._items.createRow({
            name: name,
            description: description,
        })
        this._db.insert().into(this._items).values([item]).exec()
        if (parent) {
            let ref = this._refs.createRow({
                item_name: name,
                ref_name: parent,
                is_tag: false,
                is_parent: true,
            })
            this._db.insert().into(this._refs).values([ref]).exec()
        }
    }
    get items() { return this._db.select().from(this._items).exec() }

    import(db) {
        let schemaBuilder = lf.schema.create(db.name, db.version)
        var imported_db
        return schemaBuilder.connect({
            storeType: lf.schema.DataStoreType.MEMORY // TODO まずはこれ
        }).then((_db) => {
            imported_db = _db
            return _db.import(db)
        }).then(() => this.reinit(imported_db))
    }
    export() { return this._db.export() }
}
class TableModelBuilder {
    constructor(tableName, model) {
        this.tableName = tableName;
        if (!model)
            this.model = model
        else
            this.model = model
    }

    get getTableName() {
        return this.tableName
    }

    get getModel() {
        return this.model
    }

    setModel(model) {
        this.model = model
        return this
    }

    get build() {
        return { table: this.tableName, model: this.model }
    }
}

module.exports = TableModelBuilder
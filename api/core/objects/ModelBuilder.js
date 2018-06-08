class ModelBuilder {
    constructor(fields) {
        if (fields)
            this.properties = fields
        else
            this.properties = {}
    }

    addField(name, faker) {
        this._add(name, faker);
        return this
    }

    _add(name, faker) {
        Object.defineProperty(this.properties, name, {
            value: faker,
            writable: true,
            configurable: true,
            enumerable: true
        });
    }

    get build() {
        return this.properties
    }
}

module.exports = ModelBuilder
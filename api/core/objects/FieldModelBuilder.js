class FieldModelBuilder {
    constructor(fields) {
        if (fields)
            this.properties = fields
        else
            this.properties = {}
    }

    addField(name, faker) {
        _add(name, faker, this.properties);
        return this
    }

    get build() {
        return this.properties
    }
}

function _add(name, faker, properties) {
    Object.defineProperty(properties, name, {
        value: faker,
        writable: true,
        configurable: true,
        enumerable: true
    });
}

module.exports = FieldModelBuilder
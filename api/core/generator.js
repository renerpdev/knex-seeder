const faker = require('faker')
const SeedFaker = require('./objects/Faker')
const SeedRange = require('./objects/Range')
const util = require('./../util/functions')

function getGeneratedModel(fieldModel) {
    return util.getTablePropertiesFrom(fieldModel, _getGenerator)
}

//---
function _getGenerator(type) {
    if (typeof type === 'function') {
        return type()
    } else if (typeof type === 'object') {
        if (type instanceof SeedFaker) {
            return _fake(type.getFaker, type.getLang)
        } else if (type instanceof SeedRange) {
            return util.getRandomBetween(type.getMin, type.getMax)
        } else if (type instanceof Array) {
            var index = util.getRandom(type.length);
            var value = type[index]
            if (typeof value === 'boolean') {
                var b=new BooleanFaker(value)
                return b
            } else
                return value
        }
    }

    return type
}

function _fake(str, lang) {
    var fake
    faker.locale = lang;
    try {
        fake = faker.fake('{{' + str + '}}')
    } catch (e) {
        fake = `FAILED`.bgRed + `\n->> ${e}`.red
    }

    return fake
}

class BooleanFaker {
    constructor(value) {
        this.value = value;
    }
    get getValue() {
        return this.value;
    }
}

module.exports = {
    getGeneratedModel,
    BooleanFaker
}
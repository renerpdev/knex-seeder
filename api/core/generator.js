const faker = require('faker')
const SeedFaker = require('./objects/Faker')
const SeedRange = require('./objects/Range')
const util = require('./../util/functions')

function getGeneratedModel(model) {
    return util.getTablePropertiesFrom(model, _getGenerator)
}

//---
function _getGenerator(type) {
    if (typeof type === 'number' || typeof type === 'string') {
        return type
    }
    else if (typeof type === 'function') {
        return type()
    }
    else if (typeof type === 'object') {
        if (type instanceof SeedFaker) {
            return _fake(type.getFaker, type.getLang)
        }
        else if (type instanceof SeedRange) {
            return util.getRandomBetween(type.getMin, type.getMax)
        }
        else if (type instanceof Array) {
            return type[util.getRandom(type.length)]
        }
    }

    return null
}

function _fake(str, lang) {
    var fake
    faker.locale = lang;
    try {
        fake = faker.fake('{{' + str + '}}')
    }
    catch (e) {
        fake = `FAILED`.bgRed + `\n->> ${e}`.red
    }

    return fake
}

module.exports = {
    getGeneratedModel
}
const Schema = require('./api/core/schema')
const Seeder = require('./api/core/process')
const util = require('./api/util/functions')
const constants = require('./api/util/constants')
const {
    colors,
    suffix
} = require('./api/util/colors')
const Generator = require('./api/core/generator')
const SeedFaker = require('./api/core/objects/Faker')
const SeedRange = require('./api/core/objects/Range')
const SpecBuilder = require('./api/core/objects/SpecBuilder')
const ModelBuilder = require('./api/core/objects/ModelBuilder')
const knex = require('./api/knex.conf')

function createAndSeed(spec, queries, fn) {
    console.log(`${colors.FgBlue}   ([^ _ ^])${suffix}`)
    return Schema.createTable(spec, fn).then(() => {
        return Seeder.seed(spec, queries)
    }).catch((err) => {
        console.log(`\n ${colors.FgRed}->> ${err}${suffix}`)
        util.closeConnection()
    })
}

function createAndSeed_close(spec, queries, fn) {
    return createAndSeed(spec, queries, fn).then(() => {
        util.closeConnection()
    })
}

module.exports = {
    Schema,
    Seeder,
    Generator,
    SpecBuilder,
    ModelBuilder,
    SeedFaker,
    SeedRange,
    createAndSeed,
    createAndSeed_close,
    close: util.closeConnection,
    knex,
    lang: constants.langs,
    faker: constants.types,
}
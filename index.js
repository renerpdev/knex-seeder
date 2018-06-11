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
const TableModelBuilder = require('./api/core/objects/TableModelBuilder')
const FieldModelBuilder = require('./api/core/objects/FieldModelBuilder')
const knex = require('./api/knex.conf')

function createAndSeed(tableModel, queries, fn) {
    console.log(`${colors.FgBlue}   ([^ _ ^])${suffix}`)
    return Schema.createTable(tableModel, fn).then(() => {
        return Seeder.seed(tableModel, queries)
    }).catch((err) => {
        console.log(`\n ${colors.FgRed}->> ${err}${suffix}`)
        util.closeConnection()
    })
}

function createAndSeed_close(tableModel, queries, fn) {
    return createAndSeed(tableModel, queries, fn).then(() => {
        util.closeConnection()
    })
}

module.exports = {
    Schema,
    Seeder,
    Generator,
    TableModelBuilder,
    FieldModelBuilder,
    SeedFaker,
    SeedRange,
    createAndSeed,
    createAndSeed_close,
    close: util.closeConnection,
    knex,
    LANG: constants.lang,
    FAKER: constants.faker,
}
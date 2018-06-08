const schema = require('./api/core/schema')
const seeder = require('./api/core/process')
const util = require('./api/util/functions')
const { colors, suffix } = require('./api/util/colors')
const generator = require('./api/core/generator')
const SeedFaker = require('./api/core/objects/Faker')
const SeedRange = require('./api/core/objects/Range')
const SpecBuilder = require('./api/core/objects/SpecBuilder')
const ModelBuilder = require('./api/core/objects/ModelBuilder')

function createAndSeed(spec, fn, queries) {
    console.log(`${colors.FgBlue}   ([^ _ ^])${suffix}`)
    return schema.createTable(spec.table, fn).then(() => {
        return seeder.seed(spec, queries)
    }).catch((err) => {
        console.log(`\n ${colors.FgRed}->> ${err}${suffix}`)
        util.closeConnection()
    })
}

function createAndSeed_close(spec, fn, queries) {
    return createAndSeed(spec, fn, queries).then(() => {
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
    close: util.closeConnection
}
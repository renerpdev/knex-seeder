const {
    colors,
    suffix
} = require('./../util/colors')
const util = require('./../util/functions')
const generator = require('./generator')
const knex = require('./../knex.conf')

function seed(spec, queries) {
    return _seedProcess(spec, queries)
}

function seedAndClose(spec, queries) {
    return seed(spec, queries).then(() => {
        return util.closeConnection()
    })
}

// function seedTable(table) {
//     //do something here..
// }

// function seedTableAndClose(table) {
//     return seedtable(table)
// }

//------
function _seedProcess(spec, queries) {
    var fb = [],
        table = spec.table,
        myObject = {},
        model, fields = [],
        types = [];

    // const msg = `${colors.FgGreen}The table ${table.toUpperCase()} was seeded${suffix} `,
    //     msgerr = `${colors.FgRed}The table ${table.toUpperCase()} couldn't be seeded${suffix} `
    console.log(`--> seeding table ${colors.Underscore}${table.toUpperCase()}${suffix}...`)
    for (var i = 0; i < queries; i++) {
        model = generator.getGeneratedModel(spec.model);
        fields = model.fields
        types = model.types
        for (var j = 0; j < fields.length; j++) {
            Object.defineProperty(myObject, fields[j], {
                value: types[j],
                writable: true,
                configurable: true,
                enumerable: true
            });
        }
        fb[i] = myObject
        myObject = {};
    }
    return knex(table).insert(fb).then(() => {
        console.log(`${colors.BgGreen}SUCCESS${suffix}`)
    }).catch((err) => {
        console.log(`${colors.BgRed}FAILED${suffix}` + `\n${colors.FgRed}->> ${err}${suffix}`)
    })
}

module.exports = {
    // seedTable,
    // seedTableAndClose,
    seed,
    seedAndClose
}
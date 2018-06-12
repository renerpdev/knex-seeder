const knex = require('./../knex.conf')
const util = require('./../util/functions')
const generator = require('./generator')
const {
    colors,
    suffix
} = require('./../util/colors')

function createTable(tableModel, fn) {
    var tableName = tableModel.table
    return existTable(tableName).then(async function(exist) {
        if (!exist) {
            console.log(`--> creating table ${colors.Underscore}${tableName.toUpperCase()}${suffix}...`)
            // var msg = `${colors.FgCyan}Creation of table ${tableName.toUpperCase()}:${suffix} `
            if (!fn)
                fn = await _getCreateFn(tableModel)

            return knex.schema.createTable(tableName, fn).then(() => {
                console.log(`${colors.BgGreen}SUCCESS${suffix}`)
            }).catch((err) => {
                console.log(`${colors.BgRed}FAILED${suffix}` + `\n ${colors.FgRed}->> ${err}${suffix}`)
                util.closeConnection()
            })
        }
    })
}

function existTable(tableName) {
    return knex.schema.hasTable(tableName).then((exist) => {
        return exist
    })
}

function createTableAndClose(tableName, fn) {
    return createTable(tableName, fn).then(() => {
        return util.closeConnection()
    })
}

//--

function _getCreateFn(tableModel) {
    var model = generator.getGeneratedModel(tableModel.model)
    var fields = model.fields,
        types = model.types;
    var fn = (table) => {
        table.increments()
        for (var i = 0; i < fields.length; i++) {
            var tof = typeof types[i]
            if (tof === 'number') {
                if (types[i] - parseInt(types[i]) > 0)
                    table.decimal(fields[i])
                else
                    table.integer(fields[i])
            } else if (tof === 'object') {
                if (types[i] instanceof generator.BooleanFaker) {
                    table.boolean(fields[i])
                } else if (types[i] instanceof Date) {
                    table.date(fields[i])
                }
            } else {
                table.string(fields[i])
            }
        }
        table.timestamps(true, true)
    }

    return fn

}

module.exports = {
    createTable,
    createTableAndClose,
    existTable
}
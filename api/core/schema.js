const knex = require('./../knex.conf')
const util = require('./../util/functions')
const { colors, suffix } = require('./../util/colors')

function createTable(tableName, fn) {
    return existTable(tableName).then((exist) => {
        if (!exist) {
            console.log(`--> creating table ${colors.Underscore}${tableName.toUpperCase()}${suffix}...`)
            // var msg = `${colors.FgCyan}Creation of table ${tableName.toUpperCase()}:${suffix} `
            return knex.schema.createTable(tableName, fn).then(() => {
                console.log(`${colors.BgGreen}SUCCESS${suffix}`)
            }).catch((err) => {
                console.log(`${colors.BgRed}FAILED${suffix}` + `\n ${colors.FgRed}->> ${err}${suffix}`)
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

module.exports = {
    createTable,
    createTableAndClose,
    existTable
}
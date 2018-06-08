const knex = require('./../knex.conf')
const { colors, suffix } = require('./colors')

function closeConnection() {
    return knex.destroy().then(res => {
        console.log(`${colors.FgMagenta}Connection closed${suffix}`)
    }).catch(err => {
        console.log(`${colors.FgRed}Couldn't close the connection` + `\n->> ${err}${suffix}`)
    })
}
function getRandomBetween(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}

function getRandom(size) {
    return Math.floor(Math.random() * size)
}

function getTablePropertiesFrom(obj, fn) {
    var fields = [], types = []
    var props = Object.getOwnPropertyNames(obj)

    for (var prop in props) {
        var p = props[prop];
        fields.push(p)
        types.push(fn(obj[p]) || obj[p])
    }

    return { fields, types }
}

module.exports = {
    closeConnection,
    getRandomBetween,
    getRandom,
    getTablePropertiesFrom
}
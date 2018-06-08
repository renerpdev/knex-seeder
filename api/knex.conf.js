const path = require('path')
const knex_conf = require(path.resolve('knexfile'))
const knex = require('knex')

const environment = process.env.NODE_ENV || 'production'
const db = knex(
    knex_conf[environment] ||
    knex_conf['development']) // configuring knex with the env variables

module.exports = db
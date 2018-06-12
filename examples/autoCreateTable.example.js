const ks = require('../index')

/****   Here we are gonna create automatically a table just with a model,   *
 *      without touching Knex functions directly                            ****/

const model = require('./createModel.example')
ks.Schema.createTableAndClose({
    table: 'user',
    model: model.userFieldModel.build
}).then(() => {
    //do something after here...
})
const {
    TableModelBuilder
} = require('./../index')
const {
    userFieldModel,
    roleFieldModel
} = require('./createModel.example') //importing model examples
const ks = require('./../index')

//specs creations
var userTableModel = new TableModelBuilder('user', userFieldModel.build).build //need to call build method to export the properties
var roleTableModel = new TableModelBuilder('role', roleFieldModel.build).build

//creating and seeding process
ks.createAndSeed(userTableModel, 10).then(() => {
    //creating the table automatically ...
    ks.createAndSeed_close(roleTableModel, 10, (table) => { //closes the connection after process
        table.increments(),
            table.string('name'),
            table.string('category'),
            table.timestamps(true, true)
    })
})
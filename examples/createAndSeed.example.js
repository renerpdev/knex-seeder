const {
    SpecBuilder
} = require('./../index')
const {
    userModel,
    roleModel
} = require('./createModel.example') //importing model examples
const ks = require('./../index')

//specs creations
var userSpec = new SpecBuilder('user', userModel.build).build //need to call build method to export the properties
var roleSpec = new SpecBuilder('role', roleModel.build).build

//creating and seeding process
ks.createAndSeed(userSpec, 10).then(() => {
    //creating the table automatically ...
    ks.createAndSeed_close(roleSpec, 10, (table) => { //closes the connection after process
        table.increments(),
            table.string('name'),
            table.string('category'),
            table.timestamps(true, true)
    })
})
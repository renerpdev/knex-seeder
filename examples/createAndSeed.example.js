const {
    SpecBuilder
} = require('./../index')
const {
    userModel,
    roleModel
} = require('./createModel.example') //importing model examples
const ks = require('./../index')

//specs creations
var userSpec = new SpecBuilder('user', userModel.build) //need to call build method to export the properties
var roleSpec = new SpecBuilder('role', roleModel.build)

//creating and seeding process
ks.createAndSeed(userSpec.build, (table) => {
    table.increments(),
        table.integer('age'),
        table.integer('eval'),
        table.string('name'),
        table.string('country'),
        table.string('gender'),
        table.timestamps(true, true)
}, 10).then(() => {
    ks.createAndSeed_close(roleSpec.build, (table) => { //closes the connection after process
        table.increments(),
            table.string('name'),
            table.string('category'),
            table.timestamps(true, true)
    }, 20)
})
const ks = require('../index')
const {
    SpecBuilder,
    ModelBuilder
} = require('../index')
const {
    userModel
} = require('./createModel.example')

var mySpec = new SpecBuilder('user', userModel.build)
ks.seeder.seedAndClose(mySpec.build, 10).then(() => {
    //do something after...
})
const ks = require('../index')
const {
    TableModelBuilder,
    FieldModelBuilder
} = require('../index')
const {
    userFieldModel
} = require('./createModel.example')

var userTableModel = new TableModelBuilder('user', userFieldModel.build).build
ks.Seeder.seedAndClose(userTableModel, 10).then(() => {
    //do something after...
})
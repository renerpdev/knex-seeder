const ks = require('../index')
const {
    userFieldModel,
    roleFieldModel
} = require('./createModel.example')

ks.Schema.createTable(new ks.TableModelBuilder('user', userFieldModel.build).build, (table) => {
    //here you can especify the fields of the table USER
    table.increments();
    table.string('name');
    table.integer('role_id');
    table.string('ci');
    table.timestamps(true, true);

}).then(() => { //do chainning...
    //also you can create the table automatically omitting the knex.js function
    ks.Schema.createTableAndClose(new ks.TableModelBuilder('role', roleFieldModel.build).build).then(() => {
        //do something after here...
    });
});
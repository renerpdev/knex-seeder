const ks = require('../index')
const {
    userModel,
    roleModel
} = require('./createModel.example')

ks.Schema.createTable(new ks.SpecBuilder('user', userModel.build).build, (table) => {
    //here you can especify the fields of the table USER
    table.increments();
    table.string('name');
    table.integer('role_id');
    table.string('ci');
    table.timestamps(true, true);

}).then(() => { //do chainning...
    //also you can create the table automatically omitting the knex.js function
    ks.Schema.createTableAndClose(new ks.SpecBuilder('role', roleModel.build).build).then(() => {
        //do something after here...
    });
});
const ks = require('../index')

ks.schema.createTable('user', (table) => {
    //here you can especify the fields of the table USER
    table.increments();
    table.string('name');
    table.integer('role_id');
    table.string('ci');
    table.timestamps(true, true);

}).then(() => { //do chainning...
    ks.schema.createTableAndClose('role', (table) => {
        //here you can especify the fields of the table ROLE
        table.increments();
        table.string('name');

    }).then(() => {
        //do something after here...
    });
});
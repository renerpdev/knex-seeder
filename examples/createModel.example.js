const {
    SeedFaker,
    SeedRange,
    ModelBuilder
} = require('./../index')

//models creation
var userModel = new ModelBuilder({
    name: new SeedFaker('name.findName', 'es'), //set Faker.js methods and its language
    age: [7, 8, 9, 10, 11, 12, 13], //set your own array seeder (its gonna be selected one of them)
    eval: new SeedRange(2, 3), //or a Range seeder (select a value in a range)
    country: 'Cuba', //set a constant seeder (won't change the value)
    is_admin: [true, false], //or an Array of boolean values
    birthday: new Date(),//also can set a Date object
    //just create the faker you like...
})

//adding other fields after model creation is done
userModel.addField('gender', () => { //especify a funcion seeder (return something inside)
    var c = ['M', 'F'];
    var index = Math.floor(Math.random() * c.length);
    return c[index];
})

var roleModel = new ModelBuilder();

//adding other fields after model creation is done
roleModel.addField('name', ['administrator', 'author', 'user', 'client'])
    .addField('category', ['info', 'gest', 'admin', 'buy'])

module.exports = {
    roleModel,
    userModel
}
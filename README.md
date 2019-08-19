# **knex-seeder**

![GitHub top language](https://img.shields.io/github/languages/top/2rhop/knex-seeder.svg)
![license](https://img.shields.io/github/license/2rhop/knex-seeder.svg)
[![GitHub (pre-)release](https://img.shields.io/github/release/2rhop/knex-seeder/all.svg)](https://github.com/2rhop/knex-seeder/releases)
====

## <img align="center" alt="knex-seeder Logo" src="https://raw.githubusercontent.com/2rhop/knex-seeder/master/assets/logo.png" height=150 title="knex-seeder"/>

### [Knex](http://knexjs.org) tool for seeding massive amount of fake data into a database.

## Table of topics

  1. [Get started](#about)
  2. [Installation](#installation)
  2. [Basic configuration](#configuration)
  1. [Examples](#examples)
  1. [API](#api)
  6. [Database connections](#connections)
  6. [Be a contributor](#contributing)
  6. [Get updated](#changelog)
  6. [Licence](#licence)
  6. [Further help](#help)

## About
This tool incorporates [Faker.js](https://www.npmjs.com/package/faker) for generating massive amounts of fake data. As `knex-seeder` is built in top of `Knex.js` module,it is possible to use the functions for creating and seeding tables.

# Get Started

## Installation

### For development

```bash
git clone https://github.com/2rhop/knex-seeder.git ks
cd ks
npm install
```
### For production

```bash
npm install knex-seeder --save
```

## Configuration

Its important to know that `knex-seeder` loads all database configurations from a `knexfile.js` file located in your relative path, you can get more info about this file [here](https://knexjs.org/#knexfile) or just copy this code snippet:

```javascript
module.exports = {
    development: {
        client: 'database_client',
        connection: {
            host: '127.0.0.1',
            user: 'your_database_user',
            password: 'your_database_password',
            database: 'your_database_name',
            port: 'database_client_port'
        }
    }
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL || { user: 'me', database: 'my_app' }
    }
}
```
>**Note:** To switch between _environments_ you need to change the value of the `NODE_ENV` variable:

```javascript
process.env.NODE_ENV = 'development' | 'production'
```

## Examples

>**Note:** All the example scripts are located in [/examples/. . .](examples/) folder.

* First we are going to see how to create a FieldModel: (e.g [here](examples/createModel.example.js))

```javascript
const ks = require('knex-seeder')

var myFieldModel = new ks.FieldModelBuilder({
    
    fieldName : [1, 2, 5, 6, 7],//chooses an element in the array
    
    fieldName : new ks.SeedFaker('name.findName','en')//calls the faker.js function for [name.findName] with lang [english]
    
    fieldName : new ks.SeedFaker(ks.FAKER.NAME,ks.LANG.ENGLISH)//or call the faker.js functions with some predefine constants by kenex-seeder
    
    fieldName : new ks.SeedRange(2, 60),//chooses a random value in the range [2, 60]
    
    fieldName : 7,//chooses only this element for the seeding
    
    fieldName : 'Ingrid',//chooses only this element for the seeding

    fieldName : [true, false],//seeds randomly with TRUE or FALSE

    fieldName : new Date(),//seeds the table with the actual date
    
    fieldName : ()=>{//uses this fn for the seeding
      var gender = ['M', 'F'];
      var index = Math.floor(Math.random() * c.length);
      return gender[index];
    }
    
    //you can add more fields here
    ...
    
}).build;

...
```

And also how to create a TableModel:

```javascript
...

var tableName = 'myTable'
var myTableModel = new ks.TableModelBuilder(tableName, myFieldModel).build;
```

>**Note:** Notice the use of _Builder Pattern_ to create the **TableModel** and **FieldModel**, reason why before pass it as an argument you must call `.build` _getter_ to construct the _Object_.

* You can use the `Knex` functions inside **`knex-seeder`** to create a new table and also chain multiple tables creations: ( _e.g._ [here ](examples/createTable.example.js))

```javascript
const ks=require('knex-seeder')

ks.createTable(myTableModel, (table) => {
//here you can especify the fields for the first table
       table.increments();
       table.string('name');
       table.integer('role_id');
       table.timestamps(true,true);

       ...

    }).then(() => {//do chainning...
           ks.createTableAndClose(myTableModel2, (table) => {
           //here you can especify the fields for the second table
                table.increments();
                table.string('name');

                ...

            }).then(() => {
            //do something after here...
    });
});
```
Or you can omit the use of the `knex.js` function to create a new table and let `knex-seeder` to do that for you:

```javascript
...

ks.createTable(myTableModel).then(() => {//do chainning...
           ks.createTableAndClose(myTableModel2).then(() => {
            //do something after here...
    });
});
```

>**Note:** The function `createTable()` returns a _Promise_ after creation is done and the function `createTableAndClose()` also closes the connection. The last one is useful for calling it at the end of a chainning.

* Also with `knex-seeder` you can (_of course_) seed tables in a database: ( _e.g._ [here ](examples/seedTable.example.js))

```javascript
const ks = require('knex-seeder')

const queries = 10;

ks.Seeder.seedAndClose(myTableModel, queries).then(() => {
    //do something after...
})
```

* We have seen how to create a table and how to seed it, but how about do both at the same time, well here is a piece of code to show you how to do that: ( _e.g._ [here ](examples/createAndSeed.example.js))

```javascript
const ks = require('knex-seeder')

//creating and seeding process
ks.createAndSeed(myTableModel, 10, (table) => {
    table.increments(),
        table.integer('age'),
        table.string('name'),
        table.string('country'),
        ...
        table.string('gender'),
        table.timestamps(true, true)
}).then(() => {
    ks.createAndSeed_close(myTableModel2, 10, (table) => {//closes the connection after process
        table.increments(),
            table.string('name'),
            table.string('category'),
            ...
            table.timestamps(true, true)
    })
}).then(() => {
    //do something after...
})
```

or omitting the `knex.js` function to create automatically the table

```javascript
...

//creating and seeding process
ks.createAndSeed(myTableModel, 10).then(() => {
    ks.createAndSeed_close(myTableModel2, 10).then(() => {
    //do something after...
})
```

>**Note:** If you forget how to create a Model, see the first example from above.

# API

<table style="width:100%;border:4px dashed #EDBC90;">
  <tr>
    <th>Belongs to</th>
    <th>Function</th> 
    <th>Description</th>
  </tr>
  <tr>
    <td rowspan="3" style="color:#EDAF79;border-bottom:1px solid;">knex-seeder</td>
    <td><span style="color:#F179C6;">createAndSeed</span>(<i>TableModelBuilder, number, <span style="color:#DDCC22">?</span>function</i>) : <b>Promise</b></td> 
    <td>Creates a table and seed it after (does not close the connection)</td>
  </tr> 
  <tr>
    <td><span style="color:#F179C6;">createAndSeed_close</span>(<i>TableModelBuilder, number, <span style="color:#DDCC22">?</span>function</i>) : <b>Promise</b></td>
    <td>Creates a table and seed it after (closes the connection)</td> 
  </tr>
   <tr>
    <td><span style="color:#F179C6;">close</span>() : <b>Promise</b></td>
    <td>Closes the connection to the database</td> 
  </tr>

  <tr>
    <td rowspan="3" style="color:#EDAF79;border-bottom:1px solid;">knex-seeder<span style="color:white">.Schema</span></td>
    <td><span style="color:#F179C6;">createTable</span>(<i>TableModelBuilder, <span style="color:#DDCC22">?</span>function</i></i>) : <b>Promise</b></td> 
    <td>Creates a table (does not close the connection)</td>
  </tr>
  <tr>
    <td><span style="color:#F179C6;">createTableAndClose</span>(<i>TableModelBuilder, <span style="color:#DDCC22">?</span>function</i></i>) : <b>Promise</b></td>
    <td>Creates a table (closes the connection)</td> 
  </tr>
  <tr>
    <td><span style="color:#F179C6;">existTable</span>(<i>string</i>) : <b>Boolean</b></td>
    <td>Returns <b>true</b> if the table exists, otherwise returns <b>false</b></td> 
  </tr>

  <tr>
    <td rowspan="2" style="color:#EDAF79;border-bottom:1px solid;">knex-seeder<span style="color:white">.Seeder</span></td>
    <td><span style="color:#F179C6;">seed</span>(<i>TableModelBuilder, number</i>) : <b>Promise</b></td> 
    <td>Seed the table with your TableModel properties(does not close the connection)</td>
  </tr>
  <tr>
    <td><span style="color:#F179C6;">seedAndClose</span>(<i>TableModelBuilder, number</i>) : <b>Promise</b></td>
    <td>Seed the table with your TableModel properties (closes the connection)</td> 
  </tr>

  <tr>
    <td rowspan="1" style="color:#EDAF79;">knex-seeder<span style="color:white">.Generator</span></td>
    <td><span style="color:#F179C6;">getGeneratedModel</span>(<i>FieldModelBuilder</i>) : <b>object</b></td> 
    <td>Returns an object with all the correct fake values for seeding</td>
  </tr> 
</table>

>**Note:** If you wanna use the [knex.js](http://knexjs.org) api, just import `knex` variable from `knex-seeder`, just like this:

```javascript
const { knex } = require('knex-seeder')
```

or do this instead:

```javascript
const ks = require('knex-seeder')

const knex = ks.knex;
```
## Connections

To integrate this tool with a database connection you need to install the appropriate package:

* `npm install` pg
* `npm install` mysql
* `npm install` mysql2
* `npm install` mariasql
* `npm install` strong-oracle
* `npm install` oracle
* `npm install` mssql
* `npm install` sqlite3

# Support

## Contributing 
![Build Status](https://travis-ci.org/2rhop/knex-seeder.svg?branch=master)

All the unit tests are written with [Jasmine](https://www.npmjs.com/package/jasmine). Feel free to add more functionalities and bug fixes but also add a test for each of them. Just type `npm test`, but before that you need to install `Jasmine` globally.

```bash
npm install -g jasmine
```

Also remember to update the [CHANGELOG.md](/CHANGELOG.md) file with your modifications on this tool.
## Changelog 
![GitHub (Pre-)Release Date](https://img.shields.io/github/release-date-pre/2rhop/knex-seeder.svg)

Get update with all new versions [here](https://github.com/2rhop/knex-seeder/releases)

## Licence
Copyright (c) 2018 Rene Ricardo. Licensed under the MIT license.

## Help

Send me an [email](mailto:renerp2016@gmail.com) or a [tweet](https://twitter.com/2rhop_official) if you have some doubt or just add an [issue](https://github.com/2rhop/knex-seeder/issues)
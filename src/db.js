const {Sequelize} = require('sequelize');

const db = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres', // for postgres
  database:'postgres',
  username: 'postgres',
  password:'asusi8',
  port: 5432,

});

module.exports = db;
const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
    host:'localhost',
    port: 3303,
    user:'root',
    password: process.env.password,
    database:'emp_db'     
});


connection.connect();
//using connection query to return an object using promises

connection.query = util.promisify(connection.query); 
module.exports =  connection;


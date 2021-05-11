const mysql = require('mysql');
const inquirer = require ('inquirer');
const { allowedNodeEnvironmentFlags } = require('node:process');

const connection = mysql.createConnection({
    host: 'localhost',

    port: 8080,

    user: 'root',

    password: '',
    database: 'employee_trackerDB',
});



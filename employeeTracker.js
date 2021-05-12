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

const start = () => {
    inquirer.prompt({
        name: 'userOptions',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['Add department', 'Add Role', 'Add Employee', 'View Departments', 'View Roles', 'View Employees'],
    })
    .then((answer) => {
        if (answer.userOptions === 'Add Department') {
            addDept();
        }
})
};

const addDept = () => {
    inquirer.prompt({
        name: 'Department',
        type: 'input',
        message: 'What is the name of your department?',
    })
    .then()
}


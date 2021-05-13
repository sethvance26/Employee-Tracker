const mysql = require('mysql');
const inquirer = require ('inquirer');



const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: 'Bread#123',
    database: 'employee_trackerDB',
});



connection.connect((err) => {
    if (err) throw err;
    start()
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
}





// const start = () => {
//     inquirer.prompt({
//         name: 'userOptions',
//         type: 'list',
//         message: 'What would you like to do?',
//         choices: [
//             'Add Department',
//             'Add Role', 
//             'Add Employee',
//             'View Departments',
//             'View Roles', 
//             'View Employees',
//         ],
//     })
//     .then((answer) => {
        
//         switch (answer.userOptions) {
//             case 'Add Department':
//             addDept();
//             break;
        
//             case 'Add Role':
//             addRole();
//             break;
            
//             case 'Add Employee':
//             addEmp();
//             break; 

//             case 'Update an Employee Role':
//             update();
//             break;

//             case 'View All Departments':
//             viewDept();
//             break;

//             case 'View Roles':
//             viewRole();
//             break;
            
//             case 'View Employees':
//             viewEmp();
//             break;

//             default:
//                 console.log(`Wrong action: ${answer.userOptions}`)
//                 connection.end();
//             break;
// }
//     });
// };
        

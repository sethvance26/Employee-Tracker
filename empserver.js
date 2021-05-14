const mysql = require("mysql");
const inquirer = require ("inquirer");
const conTable = require("console.table");


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
        choices: [
            'Add Department',
            'Add Role', 
            'Add Employee',
            'View Departments',
            'View Roles', 
            'View Employees',
            'Nevermind',
        ],
    })
.then((answer) => {
        
        switch (answer.userOptions) {
            case 'Add Department':
            addDept();
            break;
        
            case 'Add Role':
            addRole();
            break;
            
            case 'Add Employee':
            addEmp();
            break; 

            case 'Update an Employee Role':
            update();
            break;

            case 'View All Departments':
            viewDept();
            break;

            case 'View Roles':
            viewRole();
            break;
            
            case 'View Employees':
            viewEmp();
            break;

            case 'Nevermind':
                console.log(`Invalid action: ${answer.userOptions}`);
            break;
        }
    });
}

const addDept = () => {
    inquirer
      .prompt({
        name: 'addDept',
        type: 'input',
        message: 'What is the name of the Department you would like to add?',
      })
      .then((answer) => {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          'INSERT INTO department SET ?',
          {
            dept_name: answer.addDept,
          },
          (err) => {
            if (err) throw err;
            console.log('Your Department was added successfully!');
            // re-prompt the user for if they want to bid or post
            start();
          }
        );
      });
};

const addRole = () => {
    inquirer
    .prompt({
        name: 'addRole',
        type: 'input',
        message: 'Please enter the name of the new Role', 
    })
    .then((answer) => {

        connection.query(
            'INSERT INTO Emp_role SET ?',
            {
                title: answer.addRole,
            },
            (err) => {
                if (err) throw err;
                console.log('New role added!');
                start();
            }
        );
    });
};

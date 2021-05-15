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


//This is a function to view all departments existing in the database.
const viewDept = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
    res.forEach(({ID, dept_name}) => {
        console.log(`${ID} | ${dept_name}`);
    });
    console.log('-----------------');
    start();
});
}

//This is a function to view all employee roles existing in the database.
const viewRole = () => {
    connection.query('SELECT * FROM Emp_Role', (err, res) => {
        if (err) throw err;
    res.forEach(({ID, title, salary, department_id }) => {
        console.log(`${ID} | ${title} | ${salary} | ${department_id}`);
    });
    console.log('-----------------');
    start();
});
}

//This is a function to view all employees existing in the database.
const viewEmp = () => {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
    res.forEach(({ID, firstName, lastName, roleId, managerId }) => {
        console.log
        (`${ID} | ${firstName} | ${lastName} | ${roleId} | ${managerId}`);
    });
    console.log('-----------------');
    start();
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
            // re-prompting the user, so they can continue using the app
            start();
          }
        );
      });
};

//This function is to add a new Role to our database.
const addRole = () => {
    inquirer
    .prompt([
        {
        name: 'title',
        type: 'input',
        message: 'Please enter the title of the new Role', 
        },
        {
        name: 'salary',
        type: 'input',
        message: 'What is the salary for this role?',
        },
        {
        name: 'deptid',
        type: 'input',
        message: 'What is the department ID for this role?'
        }
    ])
    .then((answer) => {
        connection.query(
            'INSERT INTO Emp_role SET ?',
            {
                title: answer.title,
                salary: answer.salary,
                deptid: answer.deptid
            },
            (err) => {
                if (err) throw err;
                console.log('New role added!');
                start();
            }
        );
    });
};

const addEmp = () => {
    inquirer
    .prompt([
        {
        name: 'first',
        type: 'input',
        message: 'Please enter new Employee first name', 
        },
        {
        name: 'last',
        type: 'input',
        message: 'Please enter new Employee last name',
        },
        {
        name: 'roleid',
        type: 'input',
        message: 'What is the ID for this employees current role?'
        },
        {
            name: 'manaid',
            type: 'input',
            message: 'What is the ID for this employees manager?'
        }
    ])
    .then((answer) => {

        connection.query(
            'INSERT INTO Emp_role SET ?',
            {
                title: answer.addEmp,
                firstName: answer.first,
                lastName: answer.last,
                roleId: answer.roleId,
                managerId: answer.manaid
            },
            (err) => {
                if (err) throw err;
                console.log('New employee added!');
                start();
            }
        );
    });
};

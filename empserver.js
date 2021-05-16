//These are our dependencies. 
const mysql = require("mysql");
const inquirer = require ("inquirer");
const util = require ("util");
const conTable = require("console.table");

//This is creating our server connection to port 3306
const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: 'Bread#123',

    database: 'employee_trackerDB',
});

//Connect to server with start function. If there is an error, display that error.
connection.connect((err) => {
    if (err) throw err;
    start()
});


const query = util.promisify(connection.query).bind(connection);

//The start function is the initial prompt 
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
            'Update An Employee Role',
            'Nevermind',
        ],
    })
.then((answer) => {
        //These are our switch cases for the different options provided to the user. This way, a certain function will run depending on their choice. 
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

            case 'View Departments':
            viewDept();
            break;

            case 'View Roles':
            viewRole();
            break;
            
            case 'View Employees':
            viewEmp();
            break;

            case 'Update An Employee Role':
            update();
            break;

            case 'Nevermind':
                connection.end();
            break;
        }
    });
};


//This is a function to view all departments currently existing in the database.
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


//This is a function to view all employee roles currently existing in the database.
const viewRole = () => {
    connection.query('SELECT * FROM Emp_Role', (err, res) => {
        if (err) throw err;
    res.forEach(({ID, title, salary, dept_id }) => {
        console.log(`${ID} | ${title} | ${salary} | ${dept_id}`);
    });
    console.log('-----------------');
    start();
});
}



//This is a function to view all employees currently existing in the database.
const viewEmp = async () => {
    const emp_Table = await query(

        `SELECT e.id AS 'Employee ID',
        e.first_name AS 'First Name',
        e.last_name AS 'Last Name',
        department.dept_name AS 'Department',
        Emp_role.title AS 'Title',
    CONCAT(m.first_name, ' ', m.last_name) 
        AS Manager FROM 
        employee_trackerdb.employee AS e 
    INNER JOIN
        Emp_role ON (e.role_id = emp_role.ID)
    INNER JOIN
        department ON (emp_role.dept_id = department.ID)
    LEFT JOIN
        employee_trackerdb.employee m ON e.manager_id = m.id
    ORDER BY
        department.dept_name;`

    );
   
    console.table(emp_Table);
        start();
    };



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
        name: 'dept_id',
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
                dept_id: answer.dept_id
            },
            (err) => {
                if (err) throw err;
                console.log('New role added!');
                start();
            }
        );
    });
};

//This is a function to add a new Employee to our database.
const addEmp = () => {
    inquirer
    .prompt([
        {
        name: "firstName",
        type: "input",
        message: "Please enter new Employee first name", 
        },
        {
        name: "lastName",
        type: "input",
        message: "Please enter new Employee last name",
        },
        {
        name: "roleId",
        type: "input",
        message: "What is the ID for this employees current role?"
        },
        {
            name: "managerId",
            type: "input",
            message: "What is the ID for this employees manager?"
        }
    ])
    .then((answer) => {

        connection.query(
            'INSERT INTO employee SET ?',
            {
                
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: answer.roleId,
                manager_id: answer.managerId,
            },
            (err) => {
                if (err) throw err;
                console.log('New employee added!');
                start();
            }
        );
    });
};

//This is a function to update an employee's role. 
const update = () => {
       inquirer.prompt([
           //First we have our prompts to select which Employee we'd like to update, and then their new Role.
           {
               name: 'employee',
               type: 'list',
               message: 'Which Employee would you like to update?',
               choices: () => listEmp(),
           },
           {
               name: 'newTitle',
               type: 'list',
               message: 'What is this employees new role?',
               choices: () => listRoles(),
           },
       ])
       
       .then(async function (res) {
           const empArray = res.employee.split(" ");
           const empFirst = empArray[0];
           const empLast = empArray[1];
           const newRole = res.newTitle;

           const updatedRole = await query('SELECT ID FROM emp_role WHERE ?', {
               title: newRole, 
           });
        
        const empID = await query(
            'SELECT ID FROM employee WHERE ? AND ?',
            [{ first_name: empFirst}, {last_name: empLast }]
        );

        await query('UPDATE employee SET ? WHERE ?', [
            {
                role_id: updatedRole[0].ID,
            },
            {
                id: empID[0].ID,
            },
        ]);

        console.log('Role updated!');
        start();
    });
};

const listEmp = async () => {
    let employees;
employees = await query('SELECT * FROM employee'); 
const employeeName = employees.map((employee) => {
    return `${employee.first_name} ${employee.last_name}`;
});
return employeeName;
};


const listRoles = async () => {
    let titleArray;
    titleArray = await query('SELECT * FROM emp_role');
    const titleList = titleArray.map((position) => {
        return `${position.title}`;
    });
    return titleList;
};
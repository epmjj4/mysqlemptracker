const inquirer = require('inquirer');
require('console.table');
const db = require('./db');
const logo = require('asciiart-logo');



const start = () => {
    const introText = logo({
        name: 'Employee Manager'
    }).render();
    console.log(introText);

    taskPrompt();
}
start();

function taskPrompt() {
    inquirer.prompt([

        {
            type: 'list',
            name: 'input',
            message: 'What would you like to do?',
            choices: [{

                    name: 'View Employees',
                    value: 'VIEW_EMPLOYEES',

                },
                {
                    name: 'View Roles',
                    value: 'VIEW_ROLES',

                },
                {
                    name: 'View Departments',
                    value: 'VIEW_DEPARTMENTS',

                },
                {
                    name: 'Add Department',
                    value: 'ADD_DEPARTMENTS',

                },
                {
                    name: 'Add Role',
                    value: 'ADD_ROLE',

                },
                {
                    name: 'Add Employee',
                    value: 'ADD_EMPLOYEE',

                },
                {
                    name: 'Update Employee Role',
                    value: 'UPDATE_EMPLOYEE_ROLE',

                },
                {
                    name: 'Finish',
                    value: 'Finish',
                },
            ],

        },

    ]).then(response => {
        switch (response.input) {

            case "VIEW_EMPLOYEES":
                return viewAllEmployees();
            case "VIEW_ROLES":
                return viewAllRoles();
            case "VIEW_DEPARTMENTS":
                return viewAllDepartments();
            case "ADD_DEPARTMENTS":
                return addDepartment();
            case "ADD_ROLE":
                return addRole();
            case "ADD_EMPLOYEE":
                return addEmployee();
            case "UPDATE_EMPLOYEE_ROLE":
                return updatedRole();
            default:
                return finishPrompts();

        }

    });
}

const finishPrompts = () => {
    console.log('Thanks and goodbye');
    process.exit();
}

async function viewAllEmployees() {
    const employees = await db.findEmployees();
    console.log(`\n`);
    console.table(employees);
    taskPrompt();
}

async function viewAllRoles() {
    const roles = await db.findRole();
    console.log(`\n`);
    console.table(roles);
    taskPrompt();
}

async function viewAllDepartments() {
    const departments = await db.findDepartment();
    console.log(`\n`);
    console.table(departments);
    taskPrompt();
}

async function addDepartment() {
    const department = await inquirer.prompt([{
            type: 'input',
            message: 'What department would you like to create',
            name: "name"
        }

    ]);
    await db.createDepartment(department);
    console.log(`${department.name} has been added to your database`);
    taskPrompt();
}

async function addRole() {
    const department = await db.findDepartment();
    const listChoices = department.map(({
        id,
        name
    }) => ({
        name: name,
        id: id
    }));
    const role = await inquirer.prompt([{
            type: 'input',
            message: 'What is title of new employee?',
            name: 'title'
        },
        {
            type: 'input',
            message: 'What is the salary?',
            name: 'salary'
        },
        {
            type: 'list',
            message: 'Which department does the job fall under?',
            name: 'department_id',
            choices: listChoices
        }
    ])
    await db.createRole(role)
    console.log(`${role.title} has been added to your database`);
    taskPrompt();
}

async function addEmployee() {
    const roles = await db.findRole();

    const employee = await inquirer.prompt([

        {
            type: 'input',
            message: 'What is your employess first name?',
            name: 'first_name'
        },
        {
            type: 'input',
            message: 'What is your employess last name?',
            name: 'last_name'
        }
    ]);
    const roleMap = roles.map(({
        id,
        title
    }) => ({
        name: title,
        value: id
    }));
    const roleid = await inquirer.prompt([{
        type: 'list',
        message: 'What is this employees role?',
        name: 'roleid',
        choices: roleMap
    }]);
    employee.roleid = roleid;
    await db.createEmployee(employee)

}


async function updatedRole() {
    const employees = await db.findEmployees();
    const listChoices = employees.map(({
        id,
        first_name,
        last_name
    }) => ({
        
        name: `${first_name} ${last_name}`,
        value: id

    }));
    const employeeId = await inquirer.prompt([{
        type: 'list',
        message: "Which employee's role would you like to change?",
        name: 'employeeId',
        choices: listChoices
    }])
    const roles = await db.findRole();
    const roleList = roles.map(({
        id,
        title
    }) => ({
        name: title,
        value: id
    }));
    const roleId = await inquirer.prompt([{
            type: 'list',
            message: 'What role does this employee have?',
            name: 'roleId',
            choices: roleList
        }

    ]);
    await db.updateRole(roleId, employeeId)
    console.log(employeeId)
    taskPrompt();
    //map with 3 paramaters
    //copy role section
    //create var emp id and role id
}


const inquirer = require('inquirer');
const mysql = require('mysql');
require('console.table');
const db = require('./db');
const logo = require('asciiart-logo');
const {
    connection
} = require('./db');


const start = () => {
    const introText = logo({
        name: 'Employee Manager'
    }).render();
    console.log(introText);

    taskPrompt();
}
start();

function taskPrompt() {
    inquirer.prompt([{
            type: 'list',
            name: 'input',
            message: 'Which department would you like to modify?',
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
            ],
            //add roles and employees and updated them
            //updated employeed role


        },

    ]).then(response => {
        switch (response.input) {
            case "VIEW_EMPLOYEES":
                return viewAllEmployees();
            case "VIEW_ROLES":
                return viewAllRoles();
            case "VIEW_DEPARTMENTS":
                return viewAllDepartments();
        }

    });
}

function viewAllDepartments() {
    let query = "SELECT * FROM department";
    database.query(query, (err, res) => {
        if (err) throw err;
        console.table(` `);
        console.table(`----- DEPARTMENTS----`);
        console.table(res);
    });
    taskPrompt();
}

function viewAllRoles() {
    let query = "SELECT * FROM role";
    database.query(query, (err, res) => {
        if (err) throw err;
        console.table(` `);
        console.table(`----ROLES----`);
        console.table(res);
    });
    taskPrompt();
}

function viewAllEmployees() {
    let query = "SELECT * FROM employee";
    database.query(query, (err, res) => {
        if (err) throw err;
        console.table(` `);
        console.table(`----EMPLOYEES----`);
        console.table(res);
    });
    taskPrompt();
}

function addDepartment() {
    inquirer.prompt([{
        type: 'input',
        message: "Enter the name of the department you would like to add?",
        name: 'newDepartment'
    }, ]).then(function (answer) {
        connection.query(
            'INSERT INTO department SET ?', {
                name: answer.newDepartment
            },
            function (err) {
                if (err) throw err;
                console.log("You have successfully added a new department.");
                taskPrompt();
            }
        )
    })
};

function addRole() {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        inquirer.prompt([{
                type: 'input',
                message: 'Enter the new role you would like to create?',
                name: 'newRole'

            },
            {
                type: 'input',
                message: 'How much is their annual salary?',
                name: 'annSalary'

            },
            {
                type: 'rawList',
                message: 'What department does this new role belong too?',
                choices: function () {
                    let choicesArray = [];
                    res.forEach(res => {choicesArray.push(res.name)});
                    return choicesArray;
                },
                name:'department'

            },

        ]).then(function (answer) {
            const dept = answer.department;
            connection.query('SELECT * FROM department', (err, res) => {
                if(err) throw err;
                let filteredDept = res.filter(res => {
                    return res.name == dept;
                });
                let id = filteredDept[0].id;
                connection.query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?)',
                [
                    answer.newRole,
                    parseInt(answer.salary),
                    id
                ],
                function(err) {
                    if(err) throw err;
                    console.log(`You have added this new role: ${(answer.newRole).toUpperCase()} successfully.`) 
                
            })
            viewAllRoles();
        })
    })
}





async function viewAllEmployees() {
    const employees = await db.findEmployees();
    console.log(`\n`);
    console.table(employees);
}

async function viewAllRoles() {
    const employees = await db.findRoles();
    console.log(`\n`);
    console.table(roles);
}

async function viewAllDepartments() {
    const employees = await db.findDepartments();
    console.log(`\n`);
    console.table(roles);
}
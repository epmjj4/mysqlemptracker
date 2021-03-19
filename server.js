const inquirer = require('inquirer');
const mysql = require('mysql');
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
    inquirer.prompt([{
            type: 'list',
            name: 'input',
            message: 'Which department would you like to add?',
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

// function addDepartment() {
//     inquirer.prompt ({
//         [{
//                 type: 'input',
//                 message: 'Enter new Department ',
//                 name: 'newDepartment'
//             }

//         ]
//     }
// }



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
    const employees = await db.findRoles();
    console.log(`\n`);
    console.table(roles);
}
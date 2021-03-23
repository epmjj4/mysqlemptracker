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

function addEmployee(){
    connection.query('SELECT * FROM role', (err, res) => {
        if(err) throw err;
        inquirer.prompt([
            {
                type:'input',
                message:'What is the new employees first name?',
                name:'first_name'
            },
            {
                type:'input',
                message:'What is the new employees first name?',,
                name:'last_name',
            },
            {
                type:'rawList',
                message:'Which Role does the employee belong too?',
                choices: function(){
                    let choicesArray = [];
                    res.forEach(res => {
                        choicesArray.push(res.title);
                    });
                    return choicesArray;
                }
                name:'role'
            },

        ]).then(function (answer) {
            const role = answer.role;
            connection.query('SELECT * FROM role', (err, res) => {
                if(err) throw err;
                let filteredRole = res.filter(res => {
                    return res.title == role;
                });

                let id = filteredRole[0].id;
                connection.query('INSERT INTO employee (first_name, last_name, role_id) VALUES (?,?,?)',
                [
                    answer.first_name,
                    answer.last_name,
                    id
                ],
                function (err) {
                    if(err) throw err;
                    console.log(`You have added this new employee: ${(answer.first_name)} ${(last_name, role_id)} successfully`)
                
            });
            viewAllEmployees();
        });
    });
}

function updateEmployee(){
    connection.query('SELECT * FROM employee', (err, res) => {
        if(err) throw err;
        inquirer.prompt([
            {
                type:'rawlist',
                message:'Which employee would you like to update? Please enter their name.',
                choices: function(){
                    chosenEmployee = [];
                    res.forEach(res => {
                        chosenEmployee.push(res.last_name);
                    });
                    return chosenEmployee;
                    
                },
                name:'employee'
            }

        ]).then(function (answer) {
            const changeEmployee = answer.employee;
            console.log('Employee chosen: ' = chosenEmployee);
            connection.query('SELECT * FROM role', (err, res) => {
                if(err) throw err;
                inquirer.prompt([
                    {
                        type:'rawlist',
                        message:'What is this employees new role?',
                        choice: function(){
                            newRole = [];
                            res.forEach(res => {
                                newRole.push(res.title);
                            });
                            return newRole;
                        },
                        name:"newRole"
                    }

                ]).then(function (update){
                    const updateRole = update.newRole;
                    console.log('Updated role: ' + updatedRole);
                    connection.query('SELECT * FROM role WHERE title = ?', [updatedRole], (err, res) => {
                        if (err) throw err;
                        let roldeID = res.[0].id;
                        console.log("Role id:" + roldeID);
                        let params = [roleID, changeEmployee];
                        connection.query('UPDATE employee SET role_id = ? WHERE last_name = ?', params,
                        (err,res) => {
                            if (err)throw err;
                            console.log(`You have updated ${changeEmployee}'s role to ${updatedRole}.`)
                        });
                        viewAllEmployees();
                    })
                } )
            })
        })
    }
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
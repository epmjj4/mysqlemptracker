const connection = require("./connection.js");

//find and update

class DB {
    constructor(connection){
        this.connection = connection;
       
    }
    //This is the method to grab all employees from DB
    findEmployees() {
        return this.connection.query("SELECT * FROM employee");

    }
    findDepartment(){
        return this.connection.query("SELECT * FROM department");
    }

    findRole(){
        return this.connection.query("SELECT * FROM role");
    }

    createEmployee(emp){
        return this.connection.query("INSERT INTO employee SET ?", emp);
    }

    createDepartment(dpt){
        return this.connection.query("INSERT INTO department SET ?", dpt);
    }

    createRole(rle){
        return this.connection.query("INSERT INTO role SET ?", rle);
    }

    updateRole(empId, rleId){
        return this.connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [empId, rleId]);
    }
};

module.exports = new DB(connection);
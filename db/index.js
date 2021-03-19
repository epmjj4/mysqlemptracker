const connection = require("./connection.js");

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
};

module.exports = new DB(connection);
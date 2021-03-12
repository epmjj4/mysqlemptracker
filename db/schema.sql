DROP DATABASE IF EXISTS emp_db;
CREATE DATABASE emp_db;

USE emp_db;

CREATE TABLE department(
 id INTEGER AUTO_INCREMENT,
 name VARCHAR(30),
 PRIMARY KEY(id)
);

CREATE TABLE role(
id INTEGER AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL,
department_id INTEGER, 
FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
id INTEGER AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INTEGER,
manager_id INTEGER,
FOREIGN KEY (role_id) REFERENCES role(id),
FOREIGN KEY (manager_id) REFERENCES empolyee(id),
PRIMARY KEY(id)
);

-- * **role**:

--   * **id** - INT PRIMARY KEY
--   * **title** -  VARCHAR(30) to hold role title
--   * **salary** -  DECIMAL to hold role salary
--   * **department_id** -  INT to hold reference to department role belongs to

-- * **employee**:

--   * **id** - INT PRIMARY KEY
--   * **first_name** - VARCHAR(30) to hold employee first name
--   * **last_name** - VARCHAR(30) to hold employee last name
--   * **role_id** - INT to hold reference to role employee has
--   * **manager_id** - INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager

DROP DATABASE IF EXISTS emp_db;
CREATE DATABASE emp_db;

USE emp_db;

CREATE TABLE department(
 id INTEGER AUTO_INCREMENT,
 name VARCHAR(30) UNIQUE,
 PRIMARY KEY(id)
);

CREATE TABLE role(
id INTEGER AUTO_INCREMENT,
title VARCHAR(30)UNIQUE,
salary DECIMAL,
department_id INTEGER, 
FOREIGN KEY (department_id) REFERENCES department(id),
PRIMARY KEY(id)
);

CREATE TABLE employee (
id INTEGER AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INTEGER,
manager_id INTEGER,
FOREIGN KEY (role_id) REFERENCES role(id),
FOREIGN KEY (manager_id) REFERENCES employee(id),
PRIMARY KEY(id)
);



DROP DATABASE IF EXISTS organizationDB;

CREATE DATABASE organizationDB;

USE organizationDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(8,2) NULL,
  department_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (id)
);


INSERT INTO department (name)
VALUES ("production");

INSERT INTO role (title, salary, department_id)
VALUES ("director", 100000.00, 12);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Thomas", "Dawson", 1, null);

SELECT * FROM department;

SELECT * FROM role;

SELECT * FROM employee;
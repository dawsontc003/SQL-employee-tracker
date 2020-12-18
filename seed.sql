DROP DATABASE IF EXISTS organizationDB;

CREATE DATABASE organizationDB;

USE organizationDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  department VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(8,2) NULL,
  department_id INT,
  PRIMARY KEY (id),
    FOREIGN KEY (department_id) references department(id)
  );

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (id),
   FOREIGN KEY (role_id) references role(id),
   FOREIGN KEY (manager_id) references employee(id)
);


INSERT INTO department (department)
VALUES ("Executive Office"),("Executive Office"),("legal"),("sales"),("sales"),("customer support");

INSERT INTO role (title, salary, department_id)
VALUES ("CEO", 500000.00, 1),("CFO", 400000.00, 1),("lawyer", 200000.00, 2),("lead sales", 100000.00, 3),("sales", 60000.00, 3),("support", 40000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Thomas", "Dawson", 1, null),("Michael", "Jordan", 2, null),("Lisa", "Leslie", 3, null),("Sue", "Bird", 4, null),("Allen", "Iverson", 5, null),("Lonzo", "Ball", 6, null);

SELECT * FROM department;

SELECT * FROM role;

SELECT * FROM employee;
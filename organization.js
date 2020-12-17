const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
const logo = require("asciiart-logo");
const config = require("./package.json");
console.log(logo(config).render());

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Dynasty1003!",
  database: "organizationDB",
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`Connect at ${connection.threadId}`);
  menu();
});

// Function get request from user
const menu = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "what would you like to do?",
        name: "action",
        choices: [
          "View Employees",
          "View Departments",
          "View Roles",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee Role",
          "Exit",
        ],
      },
    ])
    .then(({ action }) => {
      switch (action) {
        case "View Employees":
          console.log("employee DB call");
          allEmplooyees();
          break;
        case "View Departments":
          console.log("department DB call");
          allDepartments();
          break;
        case "View Roles":
          console.log("Role DB call");
          allRoles();
          break;
        case "Add Department":
          console.log("add department call");
          addDepartment();
          break;
        case "Add Role":
          console.log("add role call");
          break;
        case "Add Employee":
          console.log("add employee call");
          break;
        case "Update Employee Role":
          console.log("update employee call");
          break;
        case "Exit":
          console.log("Exit app");
          connection.end();

        // code block
      }
    });
};

const allEmplooyees = () => {
  connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department, role.salary FROM employee, role, department WHERE employee.id = role.id = department.id",
    (err, res) => {
      if (err) throw err;

      // Log all results of the SELECT statement
      console.table(res);
      menu();
    }
  );
};

const allRoles = () => {
  connection.query(
    "SELECT role.id, role.title, department.department, role.salary FROM role, department WHERE role.id = department.id",
    (err, res) => {
      if (err) throw err;

      // Log all results of the SELECT statement
      console.table(res);
      menu();
    }
  );
};

const allDepartments = () => {
  connection.query(
    "SELECT department.id, department.department, role.title, role.salary FROM department, role WHERE department.id = role.id",
    (err, res) => {
      if (err) throw err;

      // Log all results of the SELECT statement
      console.table(res);
      menu();
    }
  );
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "what is the new department name?",
        name: "department",
      },
      {
        type: "input",
        message: "what is the department id?",
        name: "department_id",
      },
      {
        type: "input",
        message: "provide a title position?",
        name: "title",
      },
      {
        type: "input",
        message: "salary for this position?",
        name: "salary",
      },
    ])
    .then(({ title, salary, department_id, department }) => {
      connection.query(
        "INSERT INTO department SET ?",
        {
          department,
        },
        (err) => {
          if (err) throw err;
        }
      );
      connection.query(
        "INSERT INTO role SET ?",
        {
          title,
          salary,
          department_id,
        },
        (err) => {
          if (err) throw err;
          console.log(`Department added ${department}`);
          menu();
        }
      );
      console.log(title, salary, id, department);
    });
  // .then(({ title, salary, id, department }) => {
  // connection.query(
  //   "INSERT INTO role SET ?",
  //   {
  //     title,
  //     salary,
  //     id,
  //   },
  //   (err) => {
  //     if (err) throw err;
  //     console.log(`Department added ${department}`);
  //     menu();
  //   }
  // );
  // });
};
// const allEmplooyees = () => {
//   connection.query(
//     `INSERT INTO department (department) VALUES (${department})`,
//     (err, res) => {
//       if (err) throw err;

//       // Log all results of the SELECT statement
//       console.log(res);
//     }
//   );
// };

// const allEmplooyees = () => {
//   connection.query(
//     "SELECT id, first_name, last_name FROM employee",
//     (err, res) => {
//       if (err) throw err;

//       // Log all results of the SELECT statement
//       console.log(res);
//       connection.end();
//     }
//   );
// };

// connection.query(
//         "INSERT INTO chores SET ?",
//         {
//           chore,
//           difficulty,
//         },
//         (err) => {
//           if (err) throw err;
//           console.log(`Chore added ${chore}`);
//           menu();
//         }
//       );

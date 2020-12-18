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
          addRole();
          break;
        case "Add Employee":
          console.log("add employee call");
          addEmployee();
          break;
        case "Update Employee Role":
          console.log("update employee call");
          updateEmployee();
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
    ])
    .then(({ department }) => {
      connection.query(
        "INSERT INTO department SET ?",
        {
          department,
        },
        (err) => {
          if (err) throw err;
        }
      );

      console.log(department);
      menu();
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "provide a title for the new position?",
        name: "title",
      },
      {
        type: "input",
        message: "salary for this position?",
        name: "salary",
      },
      {
        type: "input",
        message: "what is the department id?",
        name: "department_id",
      },
    ])
    .then(({ title, salary, department_id }) => {
      connection.query(
        "INSERT INTO role SET ?",
        {
          title,
          salary,
          department_id,
        },
        (err) => {
          if (err) throw err;
          console.log(`Role added ${title}`);
          menu();
        }
      );
    });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "employee first name?",
        name: "first_name",
      },
      {
        type: "input",
        message: "employee last name?",
        name: "last_name",
      },
      {
        type: "input",
        message: "what is the role id?",
        name: "role_id",
      },
    ])
    .then(({ first_name, last_name, role_id }) => {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name,
          last_name,
          role_id,
        },
        (err) => {
          if (err) throw err;
          console.log(`employee added ${first_name}`);
          menu();
        }
      );
    });
};
// Need to figure out how to display employees in inquirer prompt.
const updateEmployee = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;

    // Log all results of the SELECT statement
    console.log(res);
    inquirer
      .prompt([
        {
          type: "list",
          message: "Select employee to update",
          choices() {
            const choiceArray = [];
            res.forEach(({ first_name }) => {
              choiceArray.push(first_name);
            });
            return choiceArray;
          },
          name: "employeeUpdate",
        },
        {
          type: "input",
          message: "Employee id #?",
          name: "id",
        },
        {
          type: "input",
          message: "Input title change?",
          name: "roleUpdate",
        },
        {
          type: "input",
          message: "New salary?",
          name: "newSalary",
        },
      ])
      // need to complete update to sql database for title and salary maybe department too
      .then(({ employeeUpdate, id, roleUpdate, newSalary }) => {
        connection.query(
          "UPDATE role SET ? WHERE ?",
          [
            {
              title: roleUpdate,
              salary: newSalary,
            },
            {
              id: id,
            },
          ],
          (err) => {
            if (err) throw err;

            menu();
          }
        );
      });
  });
};
//--------------------------------------------------------------------
// connection.query(
//   "UPDATE auctions SET ? WHERE ?",
//   [
//     {
//       highest_bid: answer.bid,
//     },
//     {
//       id: chosenItem.id,
//     },
//   ],
//   (error) => {
//     if (error) throw err;
//     console.log("Bid placed successfully!");
//     start();
//   }
// );

// -----------------------------------------------------------------------
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

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
          break;
        case "View Departments":
          console.log("department DB call");
          break;
        case "View Roles":
          console.log("Role DB call");
          break;
        case "Add Department":
          console.log("add department call");
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

// const menu = () => {
//   connection.query("SELECT name FROM colleges", (err, res) => {
//     if (err) throw err;

//     // Log all results of the SELECT statement
//     console.log(res);
//     connection.end();
//   });
// };

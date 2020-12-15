const mysql = require("mysql");

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
});

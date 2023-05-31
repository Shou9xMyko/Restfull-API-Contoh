const mysql = require("mysql");

const connectToDb = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "belajar_node_api",
});

module.exports = connectToDb;

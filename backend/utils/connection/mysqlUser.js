var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "ls-f0c97709932648a0a7216756d0df208cd6590be1.cltxgazdp7je.us-east-1.rds.amazonaws.com",
  user: "dbmasteruser",
  password: "%9eUFXJ#zf,-w($k&8vrleD`$LxXELsz",
  database: "chat",
});

connection.connect((err) => {
  return err
    ? console.log(`Error al Conectarse a la base de datos "chat"`)
    : console.log(`Conexión establecida a la base de datos "chat"`);
});

module.exports = connection;

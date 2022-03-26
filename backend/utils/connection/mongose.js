const moongose = require("mongoose");
const config = require("../../config/config");

async function connect() {
  if (process.env.NODE_ENV === "development") {
    await moongose
      .connect(`mongodb://${config.dbHost}/${config.dbName}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Se conecto con mongo"))
      .catch(() => console.log("Conexion a mongo fallo"));
  } else {
    await moongose
      .connect(`mongodb://my_user:my_pwd@localhost:27017/chat`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Se conecto con mongo"))
      .catch((err) => console.log(err));
  }
}

module.exports = connect;

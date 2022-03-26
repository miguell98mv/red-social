const connect = require("../utils/schema/mensajes.schema");
const connectSql = require("../utils/connection/mysqlUser");
const { reject } = require("lodash");

async function addMensajes(dataToUser, dataForUser, idForUser, idToUser) {
  connect.mensajesSchemaJoi.validate(dataToUser);
  connect.mensajesSchemaJoi.validate(dataForUser);
  return new Promise(async (resolve, reject) => {
    await connect.mensajesModel(idToUser).create(dataToUser, (error) => {
      if (error) {
        reject(error);
      }
    });

    await connect.mensajesModel(idForUser).create(dataForUser, (error) => {
      if (error) {
        connect.mensajesModel(idToUser).remove({ _id: dataForUser._id });
        reject(error);
      }

      connectSql.query(
        "UPDATE notificaciones SET mensaje = true WHERE idUser = ?",
        idToUser,
        (err, data) => {
          return err ? reject(err) : resolve(dataForUser);
        }
      );
    });
  });
}

async function getMensajes(id, chat) {
  return await connect
    .mensajesModel(id)
    .find({ chat: chat })
    .sort({ $natural: -1 })
    .limit(10);
}

async function getChatUser(id) {
  return await connect
    .mensajesModel(id)
    .aggregate([{ $group: { _id: "$chat" } }, { $sort: { fecha: 1 } }]);
}

async function getMensajesAll(id) {
  return await connect.mensajesModel(id).find();
}

async function visto(idUser, id) {
  return await connect
    .mensajesModel(id)
    .updateMany({ chat: idUser }, { $set: { visto: 0 } });
}

async function getMensajeAmigo(id, idAmigo) {
  return await connect
    .mensajesModel(id)
    .findOne({ chat: idAmigo })
    .sort({ $natural: -1 });
}

function newMensaje(id) {
  return new Promise((resolve, reject) => {
    connectSql.query(
      "SELECT mensaje FROM notificaciones WHERE idUser = ?",
      id,
      (err, data) => {
        return err ? reject(err) : resolve(data[0]);
      }
    );
  });
}

function notNewMensaje(id) {
  return new Promise((resolve, reject) => {
    connectSql.query(
      "UPDATE notificaciones SET mensaje = false WHERE idUser = ?",
      id,
      (err, data) => {
        return err ? reject(err) : resolve(data[0]);
      }
    );
  });
}

module.exports = {
  addMensajes,
  getMensajes,
  getChatUser,
  getMensajesAll,
  visto,
  getMensajeAmigo,
  newMensaje,
  notNewMensaje,
};

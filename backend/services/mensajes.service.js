const model = require("../model/mensajes.model");
const modelToUser = require("../model/user.model");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const crypto = require("crypto-js");

async function addMensajes(data, token) {
  dataToUser = { ...data };
  dataForUser = { ...data };

  const { id, private_key } = jwt.verify(token, config.jwtSecret);
  const toUser = await modelToUser.getUserMensaje(data.toUser);
  dataToUser.forUser = id;
  dataForUser.forUser = id;
  dataForUser.chat = toUser.id;
  dataForUser.visto = 0;
  dataToUser.visto = 1;
  dataToUser.chat = id;
  dataForUser.fecha = new Date().getTime();
  dataToUser.fecha = new Date().getTime();
  dataForUser.mensaje = encryptar(data, private_key);
  dataToUser.mensaje = encryptar(data, toUser.private_key);

  return model.addMensajes(dataToUser, dataForUser, id, toUser.id);
}

async function getChatUser(token) {
  const { id, private_key } = jwt.verify(token, config.jwtSecret);
  let chatUser = await model.getChatUser(id).then((result) => {
    return result;
  });

  let promesas = chatUser.map((chat) => {
    return model.getMensajeAmigo(id, chat).then((result) => {
      data = desencryptar(result, private_key);
      return data;
    });
  });

  return Promise.all(promesas).then((data) => {
    return data;
  });
}

async function getMensajesToUser(idToUser, token) {
  const { id, private_key } = jwt.verify(token, config.jwtSecret);
  return model.getMensajes(id, idToUser).then((result) => {
    if (result.length) {
      data = desencryptar(result, private_key);
      return data;
    } else {
      return [];
    }
  });
}

function encryptar(data, key) {
  return crypto.AES.encrypt(data.mensaje, key).toString();
}

function desencryptar(result, key) {
  if (result.length) {
    datos = result.map((data) => {
      mensajeBuffer = crypto.AES.decrypt(data.mensaje, key);
      mensaje = mensajeBuffer.toString(crypto.enc.Utf8);
      data.mensaje = mensaje;
      return data;
    });
    return result;
  } else {
    mensajeBuffer = crypto.AES.decrypt(result.mensaje, key);
    mensaje = mensajeBuffer.toString(crypto.enc.Utf8);
    result.mensaje = mensaje;
    return result;
  }
}

function visto(idUser, token) {
  const { id } = jwt.verify(token, config.jwtSecret);
  return model.visto(idUser, id);
}

async function getMensajeAmigo(data, token) {
  const { id, private_key } = jwt.verify(token, config.jwtSecret);

  let promesas = data.map((chat) => {
    return model.getMensajeAmigo(id, chat.id).then((result) => {
      if (result) {
        let data = desencryptar(result, private_key);
        return data;
      } else {
        chat.chat = chat.id;
        return chat;
      }
    });
  });

  return Promise.all(promesas).then((data) => {
    return data;
  });
}

function newMensaje(token) {
  const { id } = jwt.verify(token, config.jwtSecret);
  return model.newMensaje(id);
}

function notNewMensaje(token) {
  const { id } = jwt.verify(token, config.jwtSecret);
  return model.notNewMensaje(id);
}

module.exports = {
  addMensajes,
  getChatUser,
  getMensajesToUser,
  visto,
  getMensajeAmigo,
  newMensaje,
  notNewMensaje,
};

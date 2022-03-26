const model = require("../model/socket.model");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { nanoid } = require("nanoid");

function addComentarios(data, token) {
  const { id } = jwt.verify(token, config.jwtSecret);
  data.idAmigo = id;
  data.comentarios = true;
  data.id = nanoid();
  return model.addComentarios(data);
}

function getComentarios(data) {
  return model.getComentarios(data.idPost);
}

function addLike(data, token) {
  const { id } = jwt.verify(token, config.jwtSecret);
  data.idUser = data.idAmigo;
  data.idAmigo = id;
  data.likes = true;
  data.id = nanoid();
  return model.addLike(data);
}

function inactivo(token) {
  id = jwt.verify(token, config.jwtSecret).id;
  return model.inactivo(id);
}

function getAmigosActivos(idUser) {
  return model.getAmigosActivos(idUser);
}

module.exports = {
  addComentarios,
  getComentarios,
  addLike,
  inactivo,
  getAmigosActivos,
};

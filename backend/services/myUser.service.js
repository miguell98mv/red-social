const model = require("../model/myUser.model");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { nanoid } = require("nanoid");

function addPost(data, token) {
  const { id } = jwt.verify(token, config.jwtSecret);
  data.idUser = id;
  data.id = nanoid();
  return model.addPost(data);
}

function getLikes(data) {
  return model.getLikes(data.idPost);
}

function addAmgios(data, token) {
  const { id } = jwt.verify(token, config.jwtSecret);
  data.idUser = id;
  return model.addAmgios(data);
}

function getAmigos(token) {
  const { id } = jwt.verify(token, config.jwtSecret);
  return model.getAmigos(id);
}

function getSolicitudes(token) {
  const { id } = jwt.verify(token, config.jwtSecret);
  return model.getSolicitudes(id);
}

function aceptarAmistad(data, token) {
  data.idUser = jwt.verify(token, config.jwtSecret).id;
  return model.aceptarAmistad(data.idUser, data.idAmigo);
}

function getPost(data) {
  return model.getPost(data.idPost);
}

function getAmigosActivos(token) {
  const { id } = jwt.verify(token, config.jwtSecret);
  return model.getAmigosActivos(id);
}

async function getUser(token) {
  id = jwt.verify(token, config.jwtSecret).id;
  data = await model.getUser(id);
  delete data.password;
  delete data.private_key;
  delete data.activo;
  delete data.imagen_fondo;
  delete data.email;
  return data;
}

function getPostHome(page, token) {
  idUser = jwt.verify(token, config.jwtSecret).id;
  return model.getPostHome(page, idUser);
}

function getNameUser(idUser) {
  return model.getNameUser(idUser);
}

function getMyLike(data, token) {
  let datos = {};
  datos.idUser = jwt.verify(token, config.jwtSecret).id;
  datos.idPost = data.idPost;
  return model.getMyLike(datos.idUser, datos.idPost);
}

function getSearch(search, token) {
  const { id } = jwt.verify(token, config.jwtSecret);
  return model.getSearch(search, id);
}

function isAmigo(idAmigo, token) {
  const { id } = jwt.verify(token, config.jwtSecret);
  return model.isAmigo(id, idAmigo);
}

function removeAmigo(idAmigo, token) {
  const { id } = jwt.verify(token, config.jwtSecret);
  return model.removeAmigo(id, idAmigo);
}

function isActive(idUser) {
  return model.isActive(idUser);
}

function removeAmigoUser(idAmigo, token) {
  const { id } = jwt.verify(token, config.jwtSecret);

  return model.removeAmigoUser(id, idAmigo);
}

function newSolicitud(token) {
  const { id } = jwt.verify(token, config.jwtSecret);
  return model.newSolicitud(id);
}

function noNewSolicitud(token) {
  const { id } = jwt.verify(token, config.jwtSecret);
  return model.noNewSolicitud(id);
}

function newNotificacion(token) {
  const { id } = jwt.verify(token, config.jwtSecret);
  return model.newNotificacion(id);
}

function getNotificaciones(token) {
  const { id } = jwt.verify(token, config.jwtSecret);
  return model.getNotificaciones(id);
}

function noNewNotificacion(token) {
  const { id } = jwt.verify(token, config.jwtSecret);
  return model.noNewNotificacion(id);
}

module.exports = {
  addPost,
  getLikes,
  addAmgios,
  getAmigos,
  getSolicitudes,
  aceptarAmistad,
  getPost,
  getAmigosActivos,
  getUser,
  getPostHome,
  getNameUser,
  getMyLike,
  getSearch,
  isAmigo,
  removeAmigo,
  isActive,
  removeAmigoUser,
  newSolicitud,
  noNewSolicitud,
  getNotificaciones,
  newNotificacion,
  noNewNotificacion,
};

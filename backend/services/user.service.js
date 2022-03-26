const model = require("../model/user.model");
const { nanoid } = require("nanoid");
var rand = require("random-key");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

function addUser(data) {
  return bcrypt
    .hash(data.password, 10)
    .then((hash) => {
      data.password = hash;
      data.private_key = rand.generate();
      data.id = nanoid(15);
      return model.addUser(data);
    })
    .catch((error) => {
      throw error;
    });
}

function addGeneroMusical(texto, token) {
  id = jwt.verify(token, config.jwtSecret).id;
  return model.addGeneroMusical(texto, id);
}

function addQueTeGusta(texto, token) {
  id = jwt.verify(token, config.jwtSecret).id;
  return model.addQueTeGusta(texto, id);
}

function addUbicacion(texto, token) {
  id = jwt.verify(token, config.jwtSecret).id;
  return model.addUbicacion(texto, id);
}

function addTelefono(texto, token) {
  id = jwt.verify(token, config.jwtSecret).id;
  return model.addTelefono(texto, id);
}

function addImagen(texto, token) {
  id = jwt.verify(token, config.jwtSecret).id;
  return model.addImagen(texto, id);
}

function addImagenFondo(texto, token) {
  id = jwt.verify(token, config.jwtSecret).id;
  return model.addImagenFondo(texto, id);
}

function addNombre(nombre, token) {
  id = jwt.verify(token, config.jwtSecret).id;
  return model.addNombre(nombre, id);
}

function editPassword(data, token) {
  id = jwt.verify(token, config.jwtSecret).id;
  return model.getPassword(id).then((password) => {
    return bcrypt.compare(data.passwordO, password).then((result) => {
      if (result) {
        return bcrypt.hash(data.password, 10).then((hash) => {
          return model.editPassword(hash, id);
        });
      } else {
        throw new Error("Contraseñas no conciden");
      }
    });
  });
}

function addProfesion(texto, token) {
  id = jwt.verify(token, config.jwtSecret).id;
  return model.addProfesion(texto, id);
}

function myPosts(token) {
  id = jwt.verify(token, config.jwtSecret).id;
  return model.myPosts(id);
}

function userPosts(idUser) {
  return model.myPosts(idUser);
}

function getAmigosUser(idUser) {
  return model.getAmigosUser(idUser);
}

async function getPersonUser(idUser) {
  data = await model.getPersonUser(idUser);
  delete data.password;
  delete data.email;
  delete data.private_key;
  return data;
}

module.exports = {
  addUser,
  addGeneroMusical,
  addQueTeGusta,
  addUbicacion,
  addTelefono,
  addImagen,
  addImagenFondo,
  addNombre,
  editPassword,
  addProfesion,
  myPosts,
  userPosts,
  getAmigosUser,
  getPersonUser,
};

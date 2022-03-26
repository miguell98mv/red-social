const boom = require("@hapi/boom");
const service = require("../services/user.service");
const upload = require("../utils/middleware/multer");

function addGeneroMusical(req, res, next) {
  service
    .addGeneroMusical(req.body, req.cookies.token)
    .then((result) => res.json(result))
    .catch((err) => next(boom.conflict(err)));
}

function addQueTeGusta(req, res, next) {
  service
    .addQueTeGusta(req.body, req.cookies.token)
    .then((result) => res.json(result))
    .catch((err) => next(boom.conflict(err)));
}

function addUbicacion(req, res, next) {
  service
    .addUbicacion(req.body, req.cookies.token)
    .then((result) => res.json(result))
    .catch((err) => next(boom.conflict(err)));
}

function addTelefono(req, res, next) {
  service
    .addTelefono(req.body, req.cookies.token)
    .then((result) => res.json(result))
    .catch((err) => next(boom.conflict(err)));
}

function addImagen(req, res, next) {
  upload(req, res, (err) => {
    if (err) {
      return next(boom.conflict(err));
    }
    service
      .addImagen(req.file.key, req.cookies.token)
      .then((result) => res.json(result))
      .catch((err) => next(boom.conflict(err)));
  });
}

function addImagenFondo(req, res, next) {
  service
    .addImagenFondo(req.body, req.cookies.token)
    .then((result) => res.json(result))
    .catch((err) => next(boom.conflict(err)));
}

function addNombre(req, res, next) {
  service
    .addNombre(req.body.nameUser, req.cookies.token)
    .then((result) => res.json(result))
    .catch((err) => next(boom.conflict(err)));
}

function editPassword(req, res, next) {
  service
    .editPassword(req.body, req.cookies.token)
    .then((result) => res.json(result))
    .catch((err) => next(boom.conflict(err)));
}

function addProfesion(req, res, next) {
  service
    .addProfesion(req.body, req.cookies.token)
    .then((result) => res.json(result))
    .catch((err) => next(boom.conflict(err)));
}

function myPosts(req, res, next) {
  service
    .myPosts(req.cookies.token)
    .then((result) => res.json(result))
    .catch((err) => next(boom.conflict(err)));
}

function userPosts(req, res, next) {
  service
    .userPosts(req.params.idUser)
    .then((result) => res.json(result))
    .catch((err) => next(boom.conflict(err)));
}

function getAmigosUser(req, res, next) {
  service
    .getAmigosUser(req.params.idUser)
    .then((result) => res.json(result))
    .catch((err) => next(boom.conflict(err)));
}

function getPersonUser(req, res, next) {
  service
    .getPersonUser(req.params.idUser)
    .then((result) => res.json(result))
    .catch((err) => next(boom.conflict(err)));
}

module.exports = {
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

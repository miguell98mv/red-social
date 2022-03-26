const service = require("../services/mensajes.service");
const boom = require("@hapi/boom");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

function addMensajes(req, res, next) {
  service
    .addMensajes(req.body, req.cookies.token)
    .then((result) => {
      service
        .getMensajesToUser(req.body.toUser, req.cookies.token)
        .then((data) => {
          const { id } = jwt.verify(req.cookies.token, config.jwtSecret);
          let io = req.app.get("socketio");
          io.emit(`${id}-mensajes`, data);
          io.emit(`${req.body.toUser}-mensajes`, data);
          io.emit(`${id}-chatMensajes`, "");
          io.emit(`${req.body.toUser}-chatMensajes`, "");
        })
        .catch((err) => {
          next(boom.conflict(err));
        });
      res.json(result);
    })
    .catch((err) => {
      next(boom.conflict(err));
    });
}

function getChatUser(req, res, next) {
  service
    .getChatUser(req.cookies.token)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => next(boom.conflict(err)));
}

function getMensajesToUser(req, res, next) {
  service
    .getMensajesToUser(req.params.id, req.cookies.token)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => next(boom.conflict(err)));
}

function visto(req, res, next) {
  service
    .visto(req.params.idUser, req.cookies.token)
    .then((data) => {
      const { id } = jwt.verify(req.cookies.token, config.jwtSecret);
      let io = req.app.get("socketio");
      io.emit(`${id}-visto`, "");
      res.json(data);
    })
    .catch((err) => next(boom.conflict(err)));
}

function getMensajeAmigo(req, res, next) {
  service
    .getMensajeAmigo(req.body, req.cookies.token)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => next(boom.conflict(err)));
}

function newMensaje(req, res, next) {
  service
    .newMensaje(req.cookies.token)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => next(boom.conflict(err)));
}

function notNewMensaje(req, res, next) {
  service
    .notNewMensaje(req.cookies.token)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => next(boom.conflict(err)));
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

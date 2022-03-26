const service = require("../services/myUser.service");
const boom = require("@hapi/boom");
const upload = require("../utils/middleware/multer");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

function addPost(req, res, next) {
  upload(req, res, (err) => {
    if (err) {
      return next(boom.conflict(err));
    }

    let data = { texto: req.body.texto, imagen: req?.file?.key };
    service
      .addPost(data, req.cookies.token)
      .then((result) => {
        let id = jwt.decode(req.cookies.token, config.jwtSecret).id;
        let io = req.app.get("socketio");
        io.emit(`${id}-myPost`, "");
        res.json(result);
      })
      .catch((err) => {
        next(boom.conflict(err));
      });
  });
}

function getLikes(req, res, next) {
  service
    .getLikes(req.params)
    .then((result) => res.json(result))
    .catch((err) => {
      next(boom.conflict(err));
    });
}

function addAmgios(req, res, next) {
  service
    .addAmgios(req.body, req.cookies.token)
    .then((result) => {
      let io = req.app.get("socketio");
      io.emit(`${req.body.idAmigo}-solicitudes`, "");
      res.json(result);
    })
    .catch((err) => {
      next(boom.conflict(err));
    });
}

function getAmigos(req, res, next) {
  service
    .getAmigos(req.cookies.token)
    .then((result) => res.json(result))
    .catch((err) => {
      next(boom.conflict(err));
    });
}

function getSolicitudes(req, res, next) {
  service
    .getSolicitudes(req.cookies.token)
    .then((result) => res.json(result))
    .catch((err) => {
      next(boom.conflict(err));
    });
}

function aceptarAmistad(req, res, next) {
  service
    .aceptarAmistad(req.body, req.cookies.token)
    .then((result) => res.json(result))
    .catch((err) => {
      next(boom.conflict(err));
    });
}

function getPost(req, res, next) {
  service
    .getPost(req.body)
    .then((result) => res.json(result))
    .catch((err) => {
      next(boom.conflict(err));
    });
}

function getAmigosActivos(req, res, next) {
  service
    .getAmigosActivos(req.cookies.token)
    .then((result) => res.json(result))
    .catch((err) => {
      next(boom.conflict(err));
    });
}

function getUser(req, res, next) {
  service
    .getUser(req.cookies.token)
    .then((result) => res.json(result))
    .catch((err) => {
      next(boom.conflict(err));
    });
}

function getPostHome(req, res, next) {
  service
    .getPostHome(req.body.page, req.cookies.token)
    .then((result) => res.json(result))
    .catch((err) => {
      next(boom.conflict(err));
    });
}

function getNameUser(req, res, next) {
  service
    .getNameUser(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => {
      next(boom.conflict(err));
    });
}

function getMyLike(req, res, next) {
  service
    .getMyLike(req.params, req.cookies.token)
    .then((result) => res.json(result))
    .catch((err) => {
      next(boom.conflict(err));
    });
}

function getSearch(req, res, next) {
  service
    .getSearch(req.params.search, req.cookies.token)
    .then((result) => res.json(result))
    .catch((err) => {
      next(boom.conflict(err));
    });
}

function isAmigo(req, res, next) {
  service
    .isAmigo(req.params.idAmigo, req.cookies.token)
    .then((result) => res.json(result))
    .catch((err) => {
      next(boom.conflict(err));
    });
}

function removeAmigo(req, res, next) {
  service
    .removeAmigo(req.params.idAmigo, req.cookies.token)
    .then((result) => {
      let io = req.app.get("socketio");
      io.emit(`${req.params.idAmigo}-solicitudes`, "");
      res.json(result);
    })
    .catch((err) => {
      next(boom.conflict(err));
    });
}

function isActive(req, res, next) {
  service
    .isActive(req.params.idUser)
    .then((result) => res.json(result))
    .catch((err) => {
      next(boom.conflict(err));
    });
}

function removeAmigoUser(req, res, next) {
  service
    .removeAmigoUser(req.params.idAmigo, req.cookies.token)
    .then((result) => res.json(result))
    .catch((err) => {
      next(boom.conflict(err));
    });
}

function newSolicitud(req, res, next) {
  service
    .newSolicitud(req.cookies.token)
    .then((result) => res.json(result))
    .catch((err) => {
      next(boom.conflict(err));
    });
}

function newNotificacion(req, res, next) {
  service
    .newNotificacion(req.cookies.token)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      next(boom.conflict(err));
    });
}

function noNewSolicitud(req, res, next) {
  service
    .noNewSolicitud(req.cookies.token)
    .then((result) => res.json(result))
    .catch((err) => {
      next(boom.conflict(err));
    });
}

function getNotificaciones(req, res, next) {
  service
    .getNotificaciones(req.cookies.token)
    .then((result) => res.json(result))
    .catch((err) => {
      next(boom.conflict(err));
    });
}

function noNewNotificacion(req, res, next) {
  service
    .noNewNotificacion(req.cookies.token)
    .then((result) => res.json(result))
    .catch((err) => {
      next(boom.conflict(err));
    });
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

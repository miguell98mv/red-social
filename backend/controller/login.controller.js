const passport = require("passport");
require("../utils/middleware/strategyLocal");
const boom = require("@hapi/boom");
const eviroment = process.env.NODE_ENV === "production";
const service = require("../services/socket.service");
const myUserService = require("../services/myUser.service");

function login(req, res, next) {
  passport.authenticate("local", function (error, token) {
    if (error) {
      return next(boom.unauthorized(error));
    }

    if (!req.cookies.token || !req.cookies) {
      res.cookie("token", token, {
        httpOnly: false,
        secure: eviroment,
      });

      myUserService
        .getAmigosActivos(token)
        .then((result) => {
          let io = req.app.get("socketio");
          result.forEach((e) => {
            service
              .getAmigosActivos(e.id)
              .then((data) => {
                io.emit(`${e.id}-amigosActivos`, data);
              })
              .catch((err) => next(boom.conflict(err)));
          });
          res.json(result);
        })
        .catch((err) => next(boom.unauthorized(err)));
    } else {
      res.json("Ya as iniciado session");
    }
  })(req, res, next);
}

module.exports = {
  login,
};

// function inactivo(req, res, next) {
//   service
//     .inactivo(req.cookies.token)
//     .then((result) => {
//       let io = req.app.get("socketio");
//       result.forEach((e) => {
//         service
//           .getAmigosActivos(e.id)
//           .then((data) => {
//             io.emit(`${e.email}-amigosActivos`, data);
//           })
//           .catch((err) => next(boom.conflict(err)));
//       });
//       res.clearCookie("token");
//       res.json(result);
//     })
//     .catch((err) => {
//       next(boom.conflict(err));
//     });
// }

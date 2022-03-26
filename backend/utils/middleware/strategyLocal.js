const passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const config = require("../../config/config");
const model = require("../../model/user.model");
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },

    function (email, password, done) {
      model
        .getUser(email)
        .then((data) => validateUser(data, password, done))
        .catch((err) => {
          done(err);
        });
    }
  )
);

function validateUser(data, pass, done) {
  console.log(pass, data.password);
  return bcrypt
    .compare(pass, data.password)
    .then((result) => {
      if (result) {
        delete data.password;
        delete data.email;
        var token = jwt.sign({ ...data }, config.jwtSecret, {
          algorithm: "HS256",
        });

        return model
          .activo(data.id)
          .then(() => done(null, token))
          .catch((error) => done(error));
      }
      return done("El email o contraseña son incorrectas");
    })
    .catch((error) => {
      console.log(error);
      done("El email o contraseña son incorrectas");
    });
}

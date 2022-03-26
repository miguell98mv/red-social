const connection = require("../utils/connection/mysqlUser");

function addUser(data) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM usuarios WHERE nameUser = ?",
      data.nameUser,
      (error, data) => {
        if (data.length) {
          reject("Nombre de usuario ya existe");
        }
      }
    );

    connection.query(
      "SELECT * FROM usuarios WHERE email = ?",
      data.email,
      (error, data) => {
        if (data.length) {
          reject("Email ya existe");
        }
      }
    );

    connection.query("INSERT INTO usuarios SET ?", data, (error) => {
      connection.query(
        "INSERT INTO notificaciones (idUser) VALUES (?)",
        [data.id],
        (error, data) => {
          error ? reject(error) : resolve("Su cuenta de usuario a sido creada");
        }
      );
    });
  });
}

function getUser(email) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM usuarios WHERE email = ?",
      email,
      (error, data) => {
        if (error) reject(error);
        if (!data?.length > 0 || !data)
          return reject("El usuario/contraseña son incorrectas");
        resolve(data[0]);
      }
    );
  });
}

function getUserMensaje(idUser) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM usuarios WHERE id = ?",
      idUser,
      (error, data) => {
        if (error) reject(error);
        if (!data) return reject("El usuario/contraseña son incorrectas");
        if (!data.length > 0)
          return reject("El usuario/contraseña son incorrectas");
        resolve(data[0]);
      }
    );
  });
}

function addGeneroMusical(texto, id) {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE usuarios SET genero_musical = ? WHERE id = ?",
      [texto, id],
      (error) => {
        if (error) reject(error);
        resolve("Se agrego genero musical");
      }
    );
  });
}

function addUbicacion(texto, id) {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE usuarios SET ubicacion = ? WHERE id = ?",
      [texto, id],
      (error) => {
        if (error) reject(error);
        resolve("Se agrego ubicacion");
      }
    );
  });
}

function addQueTeGusta(texto, id) {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE usuarios SET que_te_gusta = ? WHERE id = ?",
      [texto, id],
      (error) => {
        if (error) reject(error);
        resolve("Se agrego cosas que te gusta hacer");
      }
    );
  });
}

function addTelefono(texto, id) {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE usuarios SET telefono = ? WHERE id = ?",
      [texto, id],
      (error) => {
        if (error) reject(error);
        resolve("Se agrego numero de telefono");
      }
    );
  });
}

function addImagen(texto, id) {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE usuarios SET imagen = ? WHERE id = ?",
      [texto, id],
      (error) => {
        if (error) reject(error);
        resolve("Se agrego imagen de perfil");
      }
    );
  });
}

function addImagenFondo(texto, id) {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE usuarios SET imagen_fondo = ? WHERE id = ?",
      [texto, id],
      (error) => {
        if (error) reject(error);
        resolve("Se agrego imagen de fondo");
      }
    );
  });
}

function activo(idUser) {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE usuarios SET activo = true WHERE id = ?",
      [idUser],
      (error) => {
        return error ? reject(error) : resolve("Usuario activo");
      }
    );
  });
}

function addNombre(nameUser, id) {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE usuarios SET nameUser = ? WHERE id = ?",
      [nameUser, id],
      (error) => {
        if (error) reject(error);
        error ? reject(error) : resolve("Se edito el contraseña correctamente");
      }
    );
  });
}

function editPassword(password, id) {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE usuarios SET password = ? WHERE id = ?",
      [password, id],
      (error) => {
        error ? reject(error) : resolve("Se edito el contraseña correctamente");
      }
    );
  });
}

function getPassword(id) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT password FROM usuarios WHERE id = ?",
      id,
      (err, data) => {
        return err ? reject(err) : resolve(data[0].password);
      }
    );
  });
}

function addProfesion(texto, id) {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE usuarios SET profesion = ? WHERE id = ?",
      [texto, id],
      (error) => {
        if (error) reject(error);
        resolve("Se agrego profesion");
      }
    );
  });
}

function myPosts(idUser) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM post WHERE idUser = ? ORDER BY fecha DESC",
      idUser,
      (error, data) => {
        return error ? reject(error) : resolve(data);
      }
    );
  });
}

function getAmigosUser(idUser) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM amigos WHERE idUser = ?",
      idUser,
      (error, data) => {
        return error ? reject(error) : resolve(data);
      }
    );
  });
}

function getPersonUser(id) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM usuarios WHERE id = ?",
      id,
      (error, data) => {
        if (error) reject(error);
        if (!data.length > 0) reject("usuario no exite");
        resolve(data[0]);
      }
    );
  });
}

module.exports = {
  addUser,
  getUser,
  addGeneroMusical,
  addQueTeGusta,
  addUbicacion,
  addTelefono,
  addImagen,
  addImagenFondo,
  activo,
  getUserMensaje,
  addNombre,
  editPassword,
  getPassword,
  addProfesion,
  myPosts,
  getAmigosUser,
  getPersonUser,
};

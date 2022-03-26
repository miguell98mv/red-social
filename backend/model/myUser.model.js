const connection = require("../utils/connection/mysqlUser");

function addPost(data) {
  return new Promise(async (resolve, reject) => {
    connection.query("INSERT INTO post SET ?", data, (error) => {
      return error ? reject(error) : resolve("Se añadio un post");
    });
  });
}

function getPost(idPost) {
  return new Promise(async (resolve, reject) => {
    connection.query(
      "SELECT * FROM post WHERE id = ?",
      idPost,
      (error, data) => {
        return error ? reject(error) : resolve(data);
      }
    );
  });
}

function getLikes(idPost) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM comentarios_likes WHERE idPost = ? AND likes = true",
      idPost,
      (error, data) => {
        let tamaño = data?.length || 0;
        return error ? reject(error) : resolve(tamaño);
      }
    );
  });
}

function getMyLike(idAmigo, idPost) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM comentarios_likes WHERE idPost = ? AND idAmigo = ?",
      [idPost, idAmigo],
      (error, data) => {
        return error ? reject(error) : resolve(data);
      }
    );
  });
}

function addAmgios(data) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM amigos WHERE idUser = ? AND idAmigo = ?",
      [data.idUser, data.idAmigo],
      (error, amigos) => {
        if (error) return reject(error);
        if (amigos.length > 0) return reject("Amigo ya añadido");

        connection.query("INSERT INTO amigos SET ?", data, (error) => {
          if (error) {
            return reject(error);
          }
        });

        connection.query(
          "INSERT INTO amigos (idAmigo, idUser, solicitud) VALUES(?,?,1)",
          [data.idUser, data.idAmigo],
          (error) => {
            if (error) reject(error);

            connection.query(
              "UPDATE notificaciones SET solicitud = 1 WHERE idUser = ?",
              data.idAmigo,
              (err, data) => {
                err ? reject(err) : resolve("Se añadio un Amigo");
              }
            );
          }
        );
      }
    );
  });
}

function getAmigos(idUser) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM amigos WHERE idUser = ? AND solicitud = 0 AND amistad = 1",
      idUser,
      (error, data) => {
        return error ? reject(error) : resolve(data);
      }
    );
  });
}

function getSolicitudes(idUser) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM amigos WHERE idUser = ? AND solicitud = true LIMIT 5",
      [idUser],
      (error, data) => {
        return error ? reject(error) : resolve(data);
      }
    );
  });
}

function aceptarAmistad(idUser, idAmigo) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM amigos WHERE solicitud = true AND idUser = ? AND idAmigo = ?",
      [idUser, idAmigo],
      (error, data) => {
        if (error) {
          return reject(error);
        }

        if (!data.length) {
          return reject("No tienes solicitudes");
        }

        connection.query(
          "UPDATE amigos SET solicitud = false, amistad = true WHERE idUser = ? AND idAmigo = ?",
          [idUser, idAmigo],
          (error) => {
            return error ? reject(error) : false;
          }
        );

        connection.query(
          "UPDATE amigos SET solicitud = false, amistad = true, solicitud = false WHERE idAmigo = ? AND idUser = ?",
          [idUser, idAmigo],
          (error) => {
            return error ? reject(error) : resolve("Se acepto la amistad");
          }
        );
      }
    );
  });
}

function getAmigosActivos(idUser) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT usuarios.id, usuarios.nameUser FROM usuarios JOIN amigos WHERE amigos.idUser = ? AND usuarios.id = amigos.idAmigo AND usuarios.activo = 1 AND amigos.amistad = true`,
      idUser,
      (error, data) => {
        return error ? reject(error) : resolve(data);
      }
    );
  });
}

function getUser(id) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM usuarios WHERE id = ?",
      id,
      (error, data) => {
        if (error) reject(error);
        if (!data.length > 0) reject("El usuario/contraseña son incorrectas");
        resolve(data[0]);
      }
    );
  });
}

function getPostHome(page, idUser) {
  return new Promise(async (resolve, reject) => {
    connection.query(
      "SELECT * FROM amigos WHERE  idUser = ? AND amistad = true",
      idUser,
      (error, data) => {
        error ? reject(error) : false;
        let peticionGlobal;

        for (let e = 0; e < data.length; e++) {
          if (e === 0) {
            peticionGlobal = `SELECT * FROM post WHERE idUser = "${data[e].idAmigo}"`;
          } else {
            peticionGlobal += ` OR idUser = "${data[e].idAmigo}"`;
          }
        }
        peticionGlobal += ` OR idUser = "${idUser}" ORDER BY fecha DESC LIMIT ${
          page * 5
        }, 5`;
        connection.query(peticionGlobal, (error2, data2) => {
          if (!data2) {
            return reject("No hay posts");
          }

          error2 ? reject(error2) : resolve(data2);
        });
      }
    );
  });
}

function getNameUser(idUser) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT nameUser FROM usuarios WHERE id = ?",
      idUser,
      (error, data) => {
        if (data.length == 0) {
          return reject(error);
        }
        return error ? reject(error) : resolve(data);
      }
    );
  });
}

function getSearch(search, id) {
  return new Promise(async (resolve, reject) => {
    connection.query(
      "SELECT id, nameUser FROM usuarios WHERE nameUser LIKE ? AND NOT id = ?",
      [search + "%", id],
      (error, data) => {
        if (data.length == 0) {
          reject(error);
        }
        error ? reject(error) : resolve(data);
      }
    );
  });
}

function isAmigo(idUser, idAmigo) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM amigos WHERE idUser = ? AND idAmigo = ?",
      [idUser, idAmigo],
      (error, data) => {
        return error ? reject(error) : resolve(data);
      }
    );
  });
}

function removeAmigo(idUser, idAmigo) {
  return new Promise((resolve, reject) => {
    connection.query(
      "DELETE FROM amigos WHERE (idUser = ? AND idAmigo = ?) OR (idAmigo = ? AND idUser = ?)",
      [idUser, idAmigo, idUser, idAmigo],
      (error, data) => {
        return error ? reject(error) : resolve(data);
      }
    );
  });
}

function removeAmigoUser(idUser, idAmigo) {
  return new Promise((resolve, reject) => {
    connection.query(
      "DELETE FROM amigos WHERE (idUser = ? AND idAmigo = ?) OR (idAmigo = ? AND idUser = ?)",
      [idUser, idAmigo, idUser, idAmigo],
      (error, data) => {
        return error ? reject(error) : resolve(data);
      }
    );
  });
}

function isActive(idUser) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT activo FROM usuarios WHERE id = ?",
      idUser,
      (error, data) => {
        return error ? reject(error) : resolve(data);
      }
    );
  });
}

function newSolicitud(id) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT solicitud FROM notificaciones WHERE idUser = ?",
      id,
      (error, data) => {
        return error ? reject(error) : resolve(data);
      }
    );
  });
}

function noNewSolicitud(id) {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE notificaciones SET solicitud = false WHERE idUser = ?",
      id,
      (error, data) => {
        return error ? reject(error) : resolve(data);
      }
    );
  });
}

function getNotificaciones(id) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM comentarios_likes WHERE idUser = ? AND (comentarios = true OR likes) = true ORDER BY fecha DESC LIMIT 5",
      id,
      (err, data) => {
        return err ? reject(err) : resolve(data);
      }
    );
  });
}

function newNotificacion(id) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT likes, comentario FROM notificaciones WHERE idUser = ?",
      id,
      (err, data) => {
        return err ? reject(err) : resolve(data);
      }
    );
  });
}

function noNewNotificacion(id) {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE notificaciones SET likes = false, comentario = false WHERE idUser = ?",
      id,
      (error, data) => {
        return error ? reject(error) : resolve(data);
      }
    );
  });
}

module.exports = {
  addPost,
  addAmgios,
  getAmigos,
  getSolicitudes,
  aceptarAmistad,
  getPost,
  getLikes,
  getMyLike,
  getAmigosActivos,
  getUser,
  getPostHome,
  getNameUser,
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

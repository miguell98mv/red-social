const connection = require("../utils/connection/mysqlUser");

function addComentarios(data) {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO comentarios_likes SET ?", data, (error) => {
      if (error) {
        reject(error);
      }

      connection.query(
        "UPDATE notificaciones SET comentario = true WHERE idUser = ?",
        data.idUser,
        (err, data) => {
          if (err) {
            return reject(err);
          }
        }
      );

      connection.query(
        "SELECT * FROM comentarios_likes WHERE idPost = ? AND comentarios = true ORDER BY fecha DESC LIMIT 5",
        data.idPost,
        (error, data) => {
          return error ? reject(error) : resolve(data);
        }
      );
    });
  });
}

function getComentarios(idPost) {
  return new Promise(async (resolve, reject) => {
    connection.query(
      "SELECT * FROM comentarios_likes WHERE idPost = ? AND comentarios = true ORDER BY fecha DESC LIMIT 5",
      idPost,
      (error, data) => {
        return error ? reject(error) : resolve(data);
      }
    );
  });
}

function addLike(datos) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM comentarios_likes WHERE idPost = ? AND idAmigo = ?",
      [datos.idPost, datos.idAmigo],
      (error, data) => {
        if (error) {
          reject(error);
        }

        connection.query(
          "UPDATE notificaciones SET likes = true WHERE idUser = ?",
          datos.idUser,
          (err, data) => {
            if (err) {
              return reject(err);
            }
          }
        );

        if (!data || !data.length) {
          connection.query(
            "INSERT INTO comentarios_likes SET ?",
            datos,
            (error, data) => {
              return error ? reject(error) : resolve([datos]);
            }
          );
        } else {
          connection.query(
            "DELETE FROM comentarios_likes WHERE idPost = ? AND idAmigo = ?",
            [datos.idPost, datos.idAmigo],
            (error) => {
              return error ? reject(error) : resolve([]);
            }
          );
        }
      }
    );
  });
}

function inactivo(idUser) {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE usuarios SET activo = false WHERE id = ?",
      [idUser],
      (error) => {
        if (error) {
          reject(error);
        }

        connection.query(
          `SELECT usuarios.id, usuarios.nameUser FROM usuarios JOIN amigos WHERE amigos.idUser = ? AND usuarios.id = amigos.idAmigo AND usuarios.activo = 1`,
          idUser,
          (error, data) => {
            return error ? reject(error) : resolve(data);
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

module.exports = {
  addComentarios,
  getComentarios,
  addLike,
  inactivo,
  getAmigosActivos,
};

const express = require("express");
const router = express.Router();
const controller = require("../controller/session.controller");

router.post("/genero_musical", controller.addGeneroMusical);
router.post("/que_te_gusta", controller.addQueTeGusta);
router.post("/ubicacion", controller.addUbicacion);
router.post("/telefono", controller.addTelefono);
router.post("/imagen_perfil", controller.addImagen);
router.post("/imagen_fondo", controller.addImagenFondo);
router.post("/addNombre", controller.addNombre);
router.post("/editPassword", controller.editPassword);
router.post("/profesion", controller.addProfesion);
router.get("/myPosts", controller.myPosts);
router.get("/userPosts/:idUser", controller.userPosts);
router.get("/getAmigosUser/:idUser", controller.getAmigosUser);
router.get("/getPersonUser/:idUser", controller.getPersonUser);

module.exports = router;

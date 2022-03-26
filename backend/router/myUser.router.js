const express = require("express");
const router = express.Router();
const controller = require("../controller/myUser.contoller");

router.post("/post", controller.addPost);
router.get("/like/:idPost", controller.getLikes);
router.post("/amigos", controller.addAmgios);
router.get("/amigos", controller.getAmigos);
router.get("/solocitud", controller.getSolicitudes);
router.post("/aceptarAmistad", controller.aceptarAmistad);
router.get("/post", controller.getPost);
router.get("/activos", controller.getAmigosActivos);
router.get("/user", controller.getUser);
router.post("/post-home", controller.getPostHome);
router.get("/nameUser/:id", controller.getNameUser);
router.get("/myLike/:idPost", controller.getMyLike);
router.get("/search/:search", controller.getSearch);
router.get("/isAmigo/:idAmigo", controller.isAmigo);
router.get("/isActive/:idUser", controller.isActive);
router.delete("/removeAmigo/:idAmigo", controller.removeAmigo);
router.delete("/removeAmigoUser/:idAmigo", controller.removeAmigoUser);
router.get("/newSolicitud", controller.newSolicitud);
router.get("/noNewSolicitud", controller.noNewSolicitud);
router.get("/getNotificaciones", controller.getNotificaciones);
router.get("/newNotificacion", controller.newNotificacion);
router.get("/noNewNotificacion", controller.noNewNotificacion);

module.exports = router;

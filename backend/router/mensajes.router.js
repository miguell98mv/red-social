const express = require("express");
const router = express.Router();
const controller = require("../controller/mensajes.controller");

router.get("/newMensaje", controller.newMensaje);
router.get("/notNewMensaje", controller.notNewMensaje);
router.post("/", controller.addMensajes);
router.get("/", controller.getChatUser);
router.get("/:id", controller.getMensajesToUser);
router.get("/visto/:idUser", controller.visto);
router.post("/mensajeAmigo", controller.getMensajeAmigo);

module.exports = router;

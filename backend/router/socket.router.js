const express = require("express");
const router = express.Router();
const controller = require("../controller/socket.controller");

router.get("/comentarios/:idPost", controller.getComentarios);
router.post("/comentarios", controller.addComentarios);
router.post("/like", controller.addLike);
router.post("/logout", controller.inactivo);

module.exports = router;

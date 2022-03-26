const Joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { nanoid } = require("nanoid");

const mensajesSchemaJoi = Joi.object({
  mensaje: Joi.string().max(150).required(),
  toUser: Joi.string().email().required(),
  forUser: Joi.string().email().required(),
  chat: Joi.string().email().required(),
});

const mensajesSchemaMongoose = new Schema({
  _id: {
    type: String,
    default: () => nanoid(),
  },
  mensaje: {
    type: "string",
    required: true,
  },
  toUser: {
    type: "string",
    required: true,
  },
  forUser: {
    type: "string",
    required: true,
  },
  chat: {
    type: "string",
    required: true,
  },
  fecha: { type: "Number", required: true },
  visto: { type: "Number", required: true },
});

function mensajesModel(id) {
  return mongoose.model(id, mensajesSchemaMongoose);
}

module.exports = {
  mensajesSchemaJoi,
  mensajesModel,
};

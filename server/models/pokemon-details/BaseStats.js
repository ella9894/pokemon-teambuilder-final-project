const { Schema } = require("mongoose");

const statsSchema = new Schema({
  hp: {
    type: Number,
    required: true,
  },
  attack: {
    type: Number,
    required: true,
  },
  defense: {
    type: Number,
    required: true,
  },
  specialAttack: {
    type: Number,
    required: true,
  },
  specialDefense: {
    type: Number,
    required: true,
  },
  speed: {
    type: Number,
    required: true,
  },
});

module.exports = statsSchema;

const { Schema } = require("mongoose");

const pokeSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  sprite: {
    type: String,
    required: true
  }
});

module.exports = pokeSchema;

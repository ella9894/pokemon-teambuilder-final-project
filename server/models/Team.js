const { Schema } = require("mongoose");

const pokeSchema = require("./Pokemon");

const teamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  monoToggle: {
    type: Boolean,
    required: true,
  },
  monotype: {
    type: String,
    required: true,
  },
  generation: {
    type: Number,
    required: true,
  },
  game: {
    type: String,
    required: true,
  },
  pokemon: [pokeSchema],
});

module.exports = teamSchema;

const { Schema } = require("mongoose");

const abilitySchema = require("./pokemon-details/Ability");
const statsSchema = require("./pokemon-details/BaseStats");

const pokeSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  abilities: [abilitySchema],
  types: [String],
  pastTypes: [String],
  stats: { statsSchema },
  maleSprite: {
    type: String,
    required: true,
  },
  femaleSprite: {
    type: String,
    required: true,
  },
  maleShinySprite: {
    type: String,
    required: true,
  },
  femaleShinySprite: {
    type: String,
    required: true,
  },
  moves: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = pokeSchema;

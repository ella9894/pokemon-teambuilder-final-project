const { Schema } = require("mongoose");

const abilitySchema = new Schema({
  slot: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  isHidden: {
    type: Boolean,
    required: true,
  },
});

module.exports = abilitySchema;

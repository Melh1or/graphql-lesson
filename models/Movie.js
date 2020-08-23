const { Schema, model } = require("mongoose");

const MovieSchema = new Schema({
  name: String,
  genre: String,
  directorId: String,
  watched: Boolean,
  rate: Number
})

module.exports = model("Movie", MovieSchema)

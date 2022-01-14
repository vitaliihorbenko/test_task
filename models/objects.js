const { Schema, model } = require("mongoose");

const objectSchema = Schema({
  name: String,
  category: String,
});

const Object = model("object", objectSchema);

module.exports = { Object };

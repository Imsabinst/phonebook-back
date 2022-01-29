const mongoose = require("mongoose");

const url =
  "mongodb+srv://fullstack:fullStack2021sbn@cluster0.u0qxb.mongodb.net/fullstack-phonebook";
mongoose.connect(url);

const Person = mongoose.model("persons", {
  name: String,
  number: String,
});

module.exports = Person;

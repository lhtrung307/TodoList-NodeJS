const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const PersonSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: "User must have username",
    unique: true
  },
  password: {
    type: String,
    required: "User must have password"
  },
  name: {
    type: String,
    trim: true,
    required: "User must have name"
  }
});

const PersonModel = Mongoose.model("person", PersonSchema);

const getPersonByUsername = function(username) {
  return PersonModel.findOne({ username });
};

const getPersonByID = function(id) {
  return PersonModel.findById(id);
};

const save = function(person) {
  return PersonModel.create(person)
    .then((person) => {
      return person;
    })
    .catch((error) => {
      return { error };
    });
};

module.exports = {
  PersonSchema,
  PersonModel,
  getPersonByUsername,
  save,
  getPersonByID
};

const People = require("../models/person");
const bcrypt = require("bcrypt");
const Joi = require("@hapi/joi");

class PersonServices {
  async createPerson(person) {
    if (typeof person === "undefined" || person === null) {
      throw new Error("Person cannot be empty");
    }
    let result = await this.validatePerson(person);
    if (result.error) {
      throw result.error;
    }
    const saltRounds = 10;
    let encryptedPass = await bcrypt.hash(person.password, saltRounds);
    if (encryptedPass) {
      person.password = encryptedPass;
    }
    let savedPerson = await People.save(person);
    if (savedPerson.error) {
      throw savedPerson.error;
    }
    return savedPerson;
  }

  async authPerson(person) {
    if (typeof person === "undefined" || person === null) {
      throw new Error("Person cannot be empty");
    }
    let personRecord;
    try {
      personRecord = await People.getPersonByUsername(person.username);
    } catch (error) {
      return error.message;
    }
    if (personRecord) {
      let result = await bcrypt.compare(person.password, personRecord.password);
      if (result.error) {
        throw result.error;
      }
      if (result) {
        return personRecord;
      }
    } else {
      throw new Error("Cannot find person");
    }
  }

  personValidate() {
    return Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
      name: Joi.string().required()
    });
  }

  validatePerson(person) {
    return Joi.validate(person, this.personValidate());
  }
}

module.exports = new PersonServices();

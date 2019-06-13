const Users = require("../models/user");
const bcrypt = require("bcrypt");

class UserServices {
  async createUser(request, h) {
    try {
      const saltRounds = 10;
      let user = request.payload;
      await bcrypt.hash(user.password, saltRounds, (err, hash) => {
        user.password = hash;
        Users.save(user);
      });
      return h.response(user).code(200);
    } catch (error) {
      return h.response(error.stack);
    }
  }
}

module.exports = new UserServices();

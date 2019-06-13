const Hapi = require("@hapi/hapi");
const Users = require("./models/user");
const Router = require("./route");
const Bcrypt = require("bcrypt");

const server = Hapi.server({
  port: 3000,
  host: "localhost"
});

const validate = async (request, username, password, h) => {
  const user = await Users.getUserByUsername(username);
  if (!user) {
    return { credentials: null, isValid: false };
  }

  const isValid = await Bcrypt.compare(password, user.password);
  const credentials = { id: user.id, name: user.name };
  return { isValid, credentials };
};

module.exports.init = async () => {
  await server.register({
    plugin: Router
  });
  await server.register(require("@hapi/basic"));

  server.auth.strategy("simple", "basic", { validate });
  server.auth.default("simple");
  return server;
};

module.exports.start = async () => {
  await exports.init();
  await server.start();
  console.log("Server running at %s", server.info.uri);
  return server;
};

process.on("unhandleRejection", (err) => {
  console.log(err);
  process.exit(1);
});

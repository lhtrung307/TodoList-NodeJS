const Hapi = require("@hapi/hapi");

const Router = require("./route");

const server = Hapi.server({
  port: 3000,
  host: "localhost"
});

module.exports.init = async () => {
  await server.register({
    plugin: Router
  });
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

const { start } = require("./server");
const Mongoose = require("mongoose");

Mongoose.connect("mongodb://localhost:27017/todo-list", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((error) => {
    console.log(error);
  });

start();

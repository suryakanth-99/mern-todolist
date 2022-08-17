const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongoose.connect(process.env.MONGO, { useNewUrlParser: true });
// const schema = mongoose.Schema;

const listSchema = new mongoose.Schema({
  task: String,
});

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    min: 5,
    max: 25,
  },
  lastname: {
    type: String,
    required: true,
    min: 5,
    max: 25,
  },
  emailid: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 25,
  },
  tasks: [listSchema],
});
const User = mongoose.model("User", userSchema);
const TaskList = mongoose.model("TaskList", listSchema);
exports.User = User;
exports.List = TaskList;

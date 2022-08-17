const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const model = require("../UserSchema/Schema.model");
const { registerValidation } = require("../validation");
const { loginValidation } = require("../validation");
// const List = require("../UserSchema/Schema.model");
const { resolveInclude } = require("ejs");
// console.log(User);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function getTasksForUser(req, res) {
  console.log(req.user);
  const user = req.user;
  const response = await model.User.findById(user._id);
  res.status(200).send(JSON.stringify(response.tasks));
  res.end();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const createUser = async (req, res) => {
  const validation = registerValidation(req.body);
  if (validation.error) {
    res.status(400).send(validation.error.details[0].message);
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = await model.User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      emailid: req.body.email,
      password: hashedPassword,
      tasks: [],
    });
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);

    res.header("auth-token", token);
    res.status(200).json({ token: token });
    // res.status(200).json({ msg: "user created", id: user.id });
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const checkForPresence = async (req, res) => {
  let email = req.body.email;

  // const response = await User.findOne({ emailid: email });
  // return response;
  model.User.findOne({ emailid: email }, async function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      // console.log(doc);
      if (doc && doc.emailid == email) {
        res.send("user existes");
      } else {
        createUser(req, res);
      }
    }
  });
  // console.log((await found.emailid) + " " + email);
  // console.log(found);
  // return false;
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function updateTasks(req, res) {
  const t = req.body;
  const addtask = new model.List({ task: t.name });
  const id = req.user;
  model.User.findOneAndUpdate(
    { _id: id._id },
    { $push: { tasks: addtask } },
    (err, doc) => {
      if (!err) {
        res.status(200).json(addtask);
      } else {
        console.log(err);
      }
    }
  );
  // console.log(doc);
  // res.send("user found");
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function LoginCheck(req, res) {
  var email = req.body.email;
  var passwrd = req.body.password;
  const validation = loginValidation(req.body);
  // console.log(validation);
  if (validation.error) {
    return res.status(400).send(validation.error.details[0].message);
  }
  //find if the user already present in database
  const response = await model.User.findOne({ emailid: email });
  // console.log(response);
  const validPass = await bcrypt.compare(passwrd, response.password);
  // console.log(validPass);
  //if he is present and the password matches then send his id
  if (response && validPass) {
    const token = jwt.sign({ _id: response._id }, process.env.SECRET_KEY);

    res.header("auth-token", token);
    res.status(200).json({ token: token });
    res.end();
  } else if (response == null) {
    res
      .status(200)
      .send(
        JSON.stringify({ msg: "You are not subscribed yet, please subscribe" })
      );
  } else {
    res.send(JSON.stringify({ msg: "wrong credentials, please check!" }));
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function deleteTask(req, res) {
  const taskId = req.params.taskid;
  // console.log(taskId);
  const user = req.user;
  model.User.findById(user._id, (err, doc) => {
    const arr = doc.tasks.filter((obj) => {
      return obj.id !== taskId;
    });
    doc.tasks = arr;
    doc.save();
    // console.log(doc.tasks);
  });

  // model.User.findOneAndUpdate(
  //   { _id: userId },
  //   { $pull: { tasks: { task: taskName } } },
  //   { safe: true, multi: false }
  // );
  // const response = await model.User.findById(userId);
  // console.log(response);
  res.status(200).send();
}

exports.LoginCheck = LoginCheck;
exports.createUser = createUser;
exports.checkForPresence = checkForPresence;
exports.updateTasks = updateTasks;
exports.getTasksForUser = getTasksForUser;
exports.deleteTask = deleteTask;

const express = require("express");
const auth = require("./auth");
const controller = require("../controllers/controller");
const router = express.Router();
const app = express();
const bodyParser = require("body-parser");
let players = require("../controllers/db");

app.use(bodyParser.json());
// router.get("/", auth, (req, res) => {
//   res.json("you can access this with token");
// });
router.get("/user", auth, controller.getTasksForUser);
router.post("/login", controller.LoginCheck);
router.post("/signup", controller.checkForPresence);
router.post("/user", auth, controller.updateTasks);
router.delete("/user/task/:taskid", auth, controller.deleteTask);

module.exports = router;

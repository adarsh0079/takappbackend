const router = require("express").Router();
const userController = require("../controllers/user");

router.post("/", userController.updateUser);

module.exports = router;

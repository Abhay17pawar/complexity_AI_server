const express = require("express");
const { signUpController, logInController } = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signUpController);
router.post("/login", logInController)

module.exports = router;
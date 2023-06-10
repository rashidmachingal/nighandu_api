const { registerUser, loginUser } = require("../controllers/authController");
const express = require("express");
const router = express.Router();

// resgister user 
router.post("/auth/register", registerUser)

// user login
router.post("/auth/login", loginUser)

module.exports = router;
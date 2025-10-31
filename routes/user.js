const express = require("express");
const { route } = require("./listing");
const router = express.Router();
const User = require("../models/user.js");
const warpAsync = require("../utils/warpAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controller/users.js")
router.route("/signup")
.get(userController.renderSignupForm)
.post( warpAsync (userController.signup))

router.route("/login")
.get(userController.renderLoginForm)
.post( 
  saveRedirectUrl, passport.authenticate("local",{failureRedirect:"/login", failureFlash:true}),userController.Login)


router.get("/logout",userController.logout);

module.exports = router;
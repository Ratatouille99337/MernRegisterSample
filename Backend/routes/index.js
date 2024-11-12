const express = require("express");
const router = express.Router();
const UserCtr = require("../controller/UserCtr");

// user api
router.post("/user/register", UserCtr.register);
router.post("/user/forgotpassword", UserCtr.forgotpassword);
router.post("/user/login", UserCtr.login);
router.post("/user/send_mail", UserCtr.sendMail);
router.post("/user/check_email", UserCtr.check_email_exist);

// update user data api
router.post("/user/update/nick_name", UserCtr.update_nick_name);
router.post(
  "/user/update/increase_following",
  UserCtr.update_increase_following
);
router.post(
  "/user/update/increase_followers",
  UserCtr.update_increase_followers
);
router.post(
  "/user/update/decrease_following",
  UserCtr.update_decrease_following
);
router.post(
  "/user/update/decrease_followers",
  UserCtr.update_decrease_followers
);
router.post("/user/update/firstname", UserCtr.update_firstname);
router.post("/user/update/firstname", UserCtr.update_lastname);
// get user data
router.post("/user/get/userdata", UserCtr.getUserData);
router.get("/user/get/userdata", UserCtr.getUserData);
//get all user
router.post("/user/get/alluser", UserCtr.getAllUser);

// coin api

module.exports = router;

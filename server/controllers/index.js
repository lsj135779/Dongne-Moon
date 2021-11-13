const express = require("express");
const router = express.Router();
const userCtrl = require("./user/userCtrl");

//user
// router.patch("/user/img/:id", userCtrl.modifyImg);
router.patch("/user/nickname/:id", userCtrl.modifyNickname);
router.patch("/user/intro/:id", userCtrl.modifyIntro);
router.post("/user/signup", userCtrl.signUp);
router.post("/user/signin", userCtrl.signIn);
router.get("/user/info/:id", userCtrl.getInfo);
// router.get("/user/auth", userCtrl.getAuth);

//post

//comment

module.exports = router;

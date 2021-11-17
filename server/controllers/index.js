const express = require("express");
const router = express.Router();
const userCtrl = require("./user/userCtrl");
const commentCtrl = require("./comment/commentCtrl");
const postCtrl = require("./post/postCtrl");
const { upload } = require('./upload');

//user
router.patch("/user/img/:id", upload.single('file'), userCtrl.modifyImg);
router.patch("/user/nickname/:id", userCtrl.modifyNickname);
router.patch("/user/intro/:id", userCtrl.modifyIntro);
router.post("/user/signup", userCtrl.signUp);
router.post("/user/signin", userCtrl.signIn);
router.get("/user/info", userCtrl.getInfo);
router.delete("/user/withdrawal", userCtrl.withdrawal);
router.post("/user/signout", userCtrl.signOut);
router.post("/user/email", userCtrl.checkEmail);

//post
router.post("/post/create", postCtrl.writePost);
router.patch("/post/update/:id", postCtrl.modifyPost);
router.delete("/post/delete/:id", postCtrl.removePost);
router.get("/post/read/:id", postCtrl.post);
router.get("/post/:category", postCtrl.postLists);

//comment
router.get("/comment/read/:id", commentCtrl.commenterInfo);
router.post("/comment/create", commentCtrl.writeComment);
router.delete("/comment/delete/:id", commentCtrl.deleteComment);

module.exports = router;

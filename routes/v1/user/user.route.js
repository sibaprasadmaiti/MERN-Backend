const router = require("express").Router();
const userController = require("../../../controllers/user/user.controller");

router.get('/user-list', userController.userList);
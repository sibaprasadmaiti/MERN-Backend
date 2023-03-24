const router = require("express").Router();
const userController = require("../../../controllers/user/user.controller");

/**
 * @swagger
 * /user/user-list:
 *      get:
 *          summary: User list fetched
 *          description: All user list fetched
 *          responses:
 *              200:
 *                  description: User list fetch successfully
 */
router.get('/user-list', userController.userList);

module.exports = router;
const router = require("express").Router();
const userRoute = require('./user.route');

/** User Routes Start  */
router.use('/user', userRoute);

module.exports = router;
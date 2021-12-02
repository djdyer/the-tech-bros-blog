const router = require("express").Router();
const userRoutes = require("../api/userRoutes");
const articleRoutes = require("./articleRoutes");

router.use("/users", userRoutes);
router.use("/home", articleRoutes);

module.exports = router;

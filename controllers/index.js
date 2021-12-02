const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");
const login = require("./api/userRoutes");
const signup = require("./api/userRoutes");

router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use("/login", login);
router.use("/signup", signup);

module.exports = router;

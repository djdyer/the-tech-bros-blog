const router = require("express").Router();
const { User } = require("../../models");

// SIGN-UP
router.post("/", async (req, res) => {
  try {
    // Add new user to db
    const userData = await User.create(req.body);
    console.log(userData);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      console.log("user_id" + req.session.user_id);
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    // try to find user by matching name
    const userData = await User.findOne({
      where: { username: req.body.username },
    });
    console.log("userData" + userData);
    // if the name doesn't match give error
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    // if the password doesn't match give error
    const validPassword = userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // Start the session with user id, set logged in true
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      console.log("req.session.user_id" + req.session.user_id);
      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/logout", (req, res) => {
  console.log("logout route");
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;

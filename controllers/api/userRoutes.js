const router = require("express").Router();
const { User, Article } = require("../../models");

// POST /api/user/login to auth a user (login)
// POST /api/user/logout to logout
// Post/Article Routes
// POST /api/post to create an article
// PUT /api/post to edit an article
// DELETE /api/post to delete an article
// Comment Routes
// POST /api/comment to create a comment on an article

// Route to sign up new user
router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Gets all users and their articles
router.get("/", async (req, res) => {
  try {
    const allUsers = await User.findAll({
      include: [{ model: Article }],
    });
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to login existing user
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to logout any user
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;

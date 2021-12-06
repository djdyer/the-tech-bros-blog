const router = require("express").Router();
const { User, Article, Comment } = require("../../models");

// SIGN-UP
router.post("/", async (req, res) => {
  try {
    // Add new user to db
    const userData = await User.create(req.body);
    console.log(userData);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
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
      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout user
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Get all users
router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["[password"] },
  })
    .then((userData) => res.json(userData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get user by id along with all articles and comments
router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Article,
        attributes: ["id", "title", "content", "date_created"],
      },

      {
        model: Comment,
        attributes: ["id", "content", "date_created"],
        include: {
          model: Article,
          attributes: ["title"],
        },
      },
    ],
  })
    .then((userData) => {
      if (!userData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(userData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/view", (req, res) => {
  res.redirect("article");
});

module.exports = router;

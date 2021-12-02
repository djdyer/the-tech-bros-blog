const router = require("express").Router();
const { Article, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Get all articles and JOIN with user/comment data
    const articleData = await Article.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["content"],
        },
      ],
    });

    // Serialize data so the template can read it
    const articles = articleData.map((article) => article.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("home", {
      articles,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/article/:id", async (req, res) => {
  try {
    const articleData = await Article.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const article = articleData.get({ plain: true });

    res.render("article", {
      ...article,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/dash", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Article }],
    });

    const user = userData.get({ plain: true });

    res.render("dash", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect to dash
  if (req.session.logged_in) {
    res.redirect("/dash");
    return;
  }

  res.render("login");
});

module.exports = router;

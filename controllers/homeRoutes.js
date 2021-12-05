const router = require("express").Router();
const { Article, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Login route loads form
router.get("/login", (req, res) => {
  // If logged in, send to dash
  if (req.session.logged_in) {
    res.redirect("/dash");
    return;
  }
  res.render("login");
});

// Sign-up
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dash");
    return;
  }
  res.render("signup");
});

// Logout route sends back to start
router.get("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
  return;
});

// Get all articles to render home page
router.get("/", async (req, res) => {
  try {
    // Get all articles and JOIN with user data
    const articleData = await Article.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    // Serialize data so the template can read it
    const articles = articleData.map((article) => article.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("home", {
      articles,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
  // window.location.reload(true);
});

// Get article by user id
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
    console.log(articleData);

    const article = articleData.get({ plain: true });

    // Load article view
    res.render("article", {
      ...article,
      logged_in: req.session.logged_in,
    });
    console.log(article);
  } catch (err) {
    res.status(500).json(err);
  }
});

// View dashboard only withAuth
router.get("/dash", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Article }],
    });
    console.log(userData);

    const user = userData.get({ plain: true });

    res.render("dash", {
      ...user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create new post
router.get("/create", withAuth, (req, res) => {
  if (req.session.logged_in) {
    res.render("create");
    return;
  }
});

module.exports = router;

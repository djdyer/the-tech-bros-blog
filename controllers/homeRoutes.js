const router = require("express").Router();
const { Article, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Login
router.get("/login", (req, res) => {
  // If logged in, send to dash
  if (req.session.logged_in) {
    res.redirect("/dash");
    return;
  }
  res.render("login");
});

// Sign-up instead
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dash");
    return;
  }
  res.render("signup");
});

// Logout sends back to home
router.get("/logout", (req, res) => {
  req.session.logged_in = false;
  res.redirect("/");
  return;
});

// Get all articles on home page
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
    const articles = articleData.map((article) => article.get({ plain: true }));

    res.render("home", {
      articles,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
  // window.location.reload(true);
});

// Select any article on homepage to view or comment
router.get("/article/:id", (req, res) => {
  Article.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: ["id", "content", "article_id", "user_id", "date_created"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })

    .then((articleData) => {
      if (!articleData) {
        res.status(404).json({ message: "No article found with this id" });
        return;
      }
      const article = articleData.get({ plain: true });
      res.render("article", { article, logged_in: req.session.logged_in });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

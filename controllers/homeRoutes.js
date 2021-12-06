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

// Sign-up instead
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dash");
    return;
  }
  res.render("signup");
});

// Logout route sends back to start
router.get("/logout", (req, res) => {
  req.session.logged_in = false;
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

// Select any article on home to view or comment
router.get("/view-comment/:id", (req, res) => {
  Article.findByPk({
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
      res.render("view-comment", { article });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

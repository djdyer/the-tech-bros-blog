const router = require("express").Router();
const { Article, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// dashboard (only after authenticating) dashboard.handlebars
// call for all posts owned by a user
// dashboard/new (only after authenticating) Making a new Post, new-post.handlebars
// check if logged in
// if yes, render new post form

// dashboard/edit/:id (only after authenticating) Editing a post, edit.handlebars
// Home page home.handlebars
// post/:id Seeing a post, post.handlebars

// Get home page without any authentication needed
router.get("/", async (req, res) => {
  try {
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

    const articles = articleData.map((article) => article.get({ plain: true }));
    res.render("home", {
      articles,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Auth is needed to view any article
router.get("/article/:id", withAuth, async (req, res) => {
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
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dash", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Article }],
    });

    const user = userData.get({ plain: true });
    res.render("dash", {
      ...user,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  console.log(req.session.loggedIn, "say something!");
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

module.exports = router;

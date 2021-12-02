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
      logged_in: req.session.logged_in,
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

router.get("/dash", withAuth, async (req, res) => {
  try {
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
  if (req.session.logged_in) {
    res.redirect("/dash");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dash");
    return;
  }
  res.render("signup");
});

module.exports = router;

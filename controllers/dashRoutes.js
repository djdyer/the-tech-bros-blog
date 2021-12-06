const router = require("express").Router();
// const sequelize = require('../config/connection');
const { Article, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Get all authored articles for dash
router.get("/", withAuth, async (req, res) => {
  // Along with comments and their users
  Article.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["title", "date_created"],
    include: [
      {
        model: Comment,
        attributes: ["content", "user_id", "date_created"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    // Serialize data, render page
    .then((articleData) => {
      const articles = articleData.map((article) =>
        article.get({ plain: true })
      );
      res.render("dash", { articles, logged_in: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Edit any article in dash
router.get("/edit/:id", withAuth, (req, res) => {
  Article.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "content", "date_created"],
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
      res.render("edit", { article, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.get("/dash", (req, res) => {
  res.render("dash");
});

module.exports = router;

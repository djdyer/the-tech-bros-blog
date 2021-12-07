const router = require("express").Router();
const { Article, User } = require("../models");
const withAuth = require("../utils/auth");

// Get all authored articles for dash
router.get("/", withAuth, async (req, res) => {
  // Along with comments and their users
  Article.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["title", "date_created"],
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

// Select any article in dash to edit
router.get("/edit/:id", withAuth, (req, res) => {
  Article.findByPK(req.params.id, {
    attributes: ["id", "title", "content", "date_created"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((articleData) => {
      if (!articleData) {
        res.status(404).json({ message: "No article found with this id" });
        return;
      }
      const article = articleData.get({ plain: true });
      res.render("edit", { article, logged_in: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/create", (req, res) => {
  res.render("create", { logged_in: true });
});

module.exports = router;

const router = require("express").Router();
const { Article, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// Get all articles for the home page
router.get("/", async (req, res) => {
  Article.findAll({
    attributes: ["id", "title", "content", "date_created"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      // {
      //   model: Comment,
      //   attributes: ["id", "content", "post_id", "user_id", "date_created"],
      // include: {
      //   model: User,
      //   attributes: ["username"],
      // },
      // },
    ],
  })
    .then((articleData) => res.json(articleData.reverse()))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get a any specific article
router.get("/:id", async (req, res) => {
  Article.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "content", "title", "date_created"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: ["id", "content", "post_id", "user_id", "date_created"],
        // include: {
        //   model: User,
        //   attributes: ["username"],
        // },
      },
    ],
  })
    .then((articleData) => {
      if (!articleData) {
        res.status(404).json({ message: "No article found with this id" });
        return;
      }
      res.json(articleData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Post a new article
router.post("/", withAuth, async (req, res) => {
  Article.create({
    title: req.body.title,
    content: req.body.content,
    user_id: req.session.user_id,
  })
    .then((articleData) => res.json(articleData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Update an article
router.put("/:id", withAuth, (req, res) => {
  Article.update(
    {
      title: req.body.title,
      content: req.body.content,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((articleData) => {
      if (!articleData) {
        res.status(404).json({ message: "No article found with this id" });
        return;
      }
      res.json(articleData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete article
router.delete("/:id", withAuth, async (req, res) => {
  Article.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((articleData) => {
      if (!articleData) {
        res.status(404).json({ message: "No article with this ID" });
        return;
      }
      res.json(articleData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;

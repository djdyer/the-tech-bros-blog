const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// Get all comments for the home page??
// router.get("/", async (req, res) => {
//   Comment.findAll({
//     attributes: ["id", "content", "date_created"],
//     include: [
//       {
//         model: User,
//         attributes: ["username"],
//       },
//     ],
//   })
//     .then((commentData) => res.json(commentData))
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// Add comment
router.post("/", withAuth, async (req, res) => {
  if (req.session) {
    Comment.create({
      content: req.body.content,
      article_id: req.body.article_id,
      user_id: req.session.user_id,
    })
      .then((commentData) => res.json(commentData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

module.exports = router;

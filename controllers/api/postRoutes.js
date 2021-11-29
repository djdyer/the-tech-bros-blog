const router = require("express").Router();
const { Post, User } = require("../../models/");

router.get("/", async (req, res) => {
  try {
    const allPosts = await Post.findAll({
      include: [{ model: User }],
    });
    res.status(200).json(allPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/create", async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post with this ID" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
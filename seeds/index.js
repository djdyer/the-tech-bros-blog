const sequelize = require("../config/connection.js");
const articleData = require("../seeds/articleData.json");
const userData = require("../seeds/userData.json");
const commentData = require("../seeds/commentData.json");
const { Article, User, Comment } = require("../models");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Article.bulkCreate(articleData, {
    individualHooks: true,
    returning: true,
  }).catch((error) => console.log(error));

  await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  }).catch((error) => console.log(error));

  process.exit(0);
};

seedDatabase();

const sequelize = require("../config/connection.js");
const Post = require("../models/post");
const postData = require("../seeds/postData.json");
const User = require("../models/user");
const userData = require("../seeds/userData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Post.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
  });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
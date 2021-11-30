const sequelize = require("../config/connection.js");
const postData = require("../seeds/postData.json");
const userData = require("../seeds/userData.json");
const { Post, User } = require("../models");
// const { postData, userData } = require("../seeds");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Post.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
  }).catch((error) => console.log(error));

  process.exit(0);
};

seedDatabase();

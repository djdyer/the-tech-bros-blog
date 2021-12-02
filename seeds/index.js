const sequelize = require("../config/connection.js");
const articleData = require("../seeds/articleData.json");
const userData = require("../seeds/userData.json");
const { Article, User } = require("../models");

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

  process.exit(0);
};

seedDatabase();

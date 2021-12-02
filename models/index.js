const Article = require("./article");
const User = require("./user");
const Comment = require("./comment");

Article.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Article.hasMany(Comment, {
  foreignKey: "article_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = {
  User,
  Comment,
  Article,
};

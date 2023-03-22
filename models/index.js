const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');
const sequelize = require('../config/connection');

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
  });

Post.hasMany(Comment, {
    foreignKey: 'user_id' 
});

module.exports = { User, Post, Comment };
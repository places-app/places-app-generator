const db = require('../models');
const User = db.user;

exports.addUser = (user) => {
  return User.create(user);
};

// exports.addUsers = () => {
// Model.bulkCreate
// };


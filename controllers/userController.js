const db = require('../models');
const User = db.user;

exports.addUser = (user) => {
  return User.create(user);
};

exports.toggleUserOn = (userId) => {
  return User.update({
    posting: true,
  },
    {
      where: {
        id: userId,
      },
    });
};

// refactor to a toggle
exports.toggleUserOff = (userId) => {
  return User.update({
    posting: false,
  },
    {
      where: {
        id: userId,
      },
    });
};

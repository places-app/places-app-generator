const db = require('../models');
const User = db.user;

exports.addUser = (user) => {
  return User.create(user);
};

exports.findAll = () => {
  return User.findAll({
    attributes: ['id', 'email', 'name', 'imageUrl',
    'repCount', 'location', 'interval', 'posting', 'moving', 'type', 'origin', 'destination'],
  });
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

exports.toggleWalkingOn = (userId) => {
  return User.update({
    moving: true,
  },
    {
      where: {
        id: userId,
      },
    });
};

// refactor to a toggle
exports.toggleWalkingOff = (userId) => {
  return User.update({
    moving: false,
  },
    {
      where: {
        id: userId,
      },
    });
};

exports.updateExtId = (userId, extId) => {
  return User.update({
    extId,
  },
    {
      where: {
        id: userId,
      },
    });
};

exports.deleteUser = (userId, cb) => {
  return User.findOne({
    where: {
      id: userId,
    },
  })
  .then((found) => {
    return User.destroy({
      where: {
        id: userId,
      },
    })
    .then(() => {
      cb(found.extId);
    });
  });
};

exports.getExtId = (userId) => {
  return User.findOne({
    where: {
      id: userId,
    },
  });
};

// exports.addUsers = () => {
// Model.bulkCreate
// };


// Project.update(
//   {
//     title: 'a very different title now'
//   },
//   {
//     where: { _id : 1 }
//   })
//   .then(function (result) { 

//   }, function(rejectedPromiseError){

//   });
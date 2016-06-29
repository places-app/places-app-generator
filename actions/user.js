const faker = require('faker');
const userController = require('../controllers/userController');

exports.createUser = (req, res) => {
  console.log('REQUEST BODY: ', req.body.interval);

  const interval = Number(req.body.interval);
  const location = req.body.location;

  const user = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    imageUrl: faker.image.avatar(),
    location, // temp this will come from the request body
    interval,
    posting: false,
    repCount: Math.floor(Math.random() * 51),
  };

  userController.addUser(user)
  .then(() => {
    res.send(user);
  })
  .catch((err) => {
    throw new Error(err);
  });
};

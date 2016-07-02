const faker = require('faker');
const userController = require('../controllers/userController');
const axios = require('axios');

exports.retrieveAll = (req, res) => {
  userController.findAll()
  .then((bots) => {
    console.log(bots);
    res.send(bots);
  });
};

exports.createUser = (req, res) => {
  console.log('REQUEST BODY: ', req.body.interval);

  const interval = Number(req.body.interval);
  const location = req.body.location;
  const origin = req.body.origin;
  const destination = req.body.destination;
  const type = req.body.type;
  let post;
  let move;

  if (type === 'posting') {
    post = false;
    move = null;
  } else {
    post = null;
    move = false;
  }

  const user = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    imageUrl: faker.image.avatar(),
    location, // temp this will come from the request body
    interval,
    posting: post,
    moving: move,
    type,
    origin,
    destination,
    repCount: Math.floor(Math.random() * 51),
  };

  userController.addUser(user)
  .then((createdUser) => {
    const config = {
      url: 'http://localhost:7000/api/bot/add',
      method: 'POST',
      data: {
        email: createdUser.email,
        name: createdUser.name,
        imageUrl: createdUser.imageUrl,
        repCount: createdUser.repCount,
      },
      withCredentials: true,
    };

    axios(config)
    .then((response) => {
      console.log(response.data);
      userController.updateExtId(createdUser.id, response.data)
      .then(() => {
        res.send(createdUser);
      });
    });
  })
  .catch((err) => {
    throw new Error(err);
  });
};

exports.deleteUser = (req, res) => {
  const userId = req.body.userId;

  userController.deleteUser(userId, (extId) => {
    const config = {
      url: 'http://localhost:7000/api/bot/delete',
      method: 'POST',
      data: {
        userId: extId,
      },
      withCredentials: true,
    };

    axios(config)
    .then((response) => {
      console.log(response.data);
      res.sendStatus(200);
    });
  })
  .catch((err) => {
    throw new Error(err);
  });
};


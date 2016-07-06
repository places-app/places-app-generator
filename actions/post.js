const userController = require('../controllers/userController');
const timeControls = require('../utils/timeControls');

exports.start = (req, res) => {
  console.log("BODY IN START: ", req.body)
  const userId = req.body.userId;
  const interval = req.body.interval;
  const location = req.body.location;

  userController.toggleUserOn(userId)
  .then(() => {
    timeControls.startPostInterval(userId, interval, location);
    res.send({
      posting: true,
    });
  })
  .catch((err) => {
    throw new Error(err);
  });

};

exports.stop = (req, res) => {
  const userId = req.body.userId;

  userController.toggleUserOff(userId)
  .then(() => {
    timeControls.stopPostInterval(userId);
    res.send({
      posting: false,
    });
  })
  .catch((err) => {
    throw new Error(err);
  });

};

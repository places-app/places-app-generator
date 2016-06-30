const userController = require('../controllers/userController');
const timeControls = require('../utils/timeControls');

exports.start = (req, res) => {
  const userId = req.body.userId;
  const interval = req.body.interval;

  userController.toggleUserOn(userId)
  .then(() => {
    timeControls.startInterval(userId, interval);
    res.send(200);
  })
  .catch((err) => {
    throw new Error(err);
  });

};

exports.stop = (req, res) => {
  const userId = req.body.userId;

  userController.toggleUserOff(userId)
  .then(() => {
    timeControls.stopInterval(userId);
    res.send(200);
  })
  .catch((err) => {
    throw new Error(err);
  });

};
const axios = require('axios');
const _ = require('lodash');

const intervalTracking = [];

let post = (userId) => {
  const config = {
    url: 'http://localhost:3000/bot',
    method: 'POST',
    data: {
      message: 'Sample message',
      userId: userId,
    },
    withCredentials: true,
  };

  axios(config)
  .then((response) => {
    // console.log(response);
  });
};

exports.startInterval = (userId, interval) => {
  let intervalId = setInterval(() => {
    post(userId);
  }, interval);

  intervalTracking.push({
    userId,
    intervalId,
  });

  console.log(intervalTracking);

};

exports.stopInterval = (userId) => {
  const intId = _.remove(intervalTracking, (val) => val.userId === userId);

  console.log(intId[0].intervalId);

  clearInterval(intId[0].intervalId);
};




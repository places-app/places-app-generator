const axios = require('axios');
const _ = require('lodash');
const yelp = require('./yelpAPI');

const intervalTracking = [];

// let post = (userId) => {
//   const config = {
//     url: 'http://localhost:3000/bot',
//     method: 'POST',
//     data: {
//       message: 'Sample message',
//       userId: userId,
//     },
//     withCredentials: true,
//   };

//   axios(config)
//   .then((response) => {
//     // console.log(response);
//   });
// };

exports.startPostInterval = (userId, interval) => {
  let indexHolder = [];
  let offset = 0;

  const intervalId = setInterval(() => {
    let index = Math.floor(Math.random() * 21);
    // console.log('indexHolder: ', indexHolder, 'index: ', index)
    if (indexHolder.indexOf(index) !== -1) {
      console.log('index collision:')
      indexHolder = [];
      offset += 20;
    }

    yelp.search(userId, index, offset, () => {
      indexHolder.push(index);
    });  // cache results
  }, interval);

  intervalTracking.push({
    userId,
    intervalId,
  });

  console.log(intervalTracking);

};

exports.stopPostInterval = (userId) => {
  const intId = _.remove(intervalTracking, (val) => val.userId === userId);

  console.log(intId[0].intervalId);

  clearInterval(intId[0].intervalId);
};


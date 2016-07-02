const userController = require('../controllers/userController');
const maps = require('../utils/mapsAPI');
const axios = require('axios');
const _ = require('lodash');

const intervalTracking = [];

exports.createWalker = (req, res) => {
  const { userId, interval } = req.body;

  res.send({
    moving: true,
  });

  userController.getExtId(userId)
  .then((found) => {
console.log(found.origin, found.destination)
    let count = 0;
    maps.getWalkRoute(found.origin, found.destination, (path) => {
      userController.toggleWalkingOn(userId)
      .catch((err) => {
        throw new Error(err);
      });

      const intervalId = setInterval(() => {      
console.log('count: ', count)
        
        if (count + 1 === path.length) {
          console.log('done with walk:', count)

          userController.toggleWalkingOff(userId)
          .then(() => {
            clearInterval(intervalId);
          })
          .catch((err) => {
            throw new Error(err);
          });
        }

        const config = {
          url: `http://localhost:3000/bot`,
          // url: `http://10.8.28.177:3333/api/users/2/location`,
          method: 'POST',
          data: {
              "location": {
                  "coords": {
                      "latitude":   path[count][0],
                      "longitude":  path[count][1],
                      // "accuracy":   [Float]
                      // "speed":      [Float],
                      // "heading":    [Float],
                      // "altitude":   [Float]
                  },
                  // "extras": {   // <-- optional extras.  @see #getCurrentPosition for details
                  //     "foo": "bar"
                  // },
                  // "activity": {
                  //     "type": [still|on_foot|walking|running|in_vehicle|on_bicycle],
                  //     "confidence": [0-100%]
                  // },
                  // "geofence": {  // <-- Present only if a geofence was triggered at this location
                  //     "identifier": [String],
                  //     "action": [String ENTER|EXIT]            
                  // },
                  // "battery": {
                  //     "level": [Float],
                  //     "is_charging": [Boolean]
                  // },
                  "timestamp": new Date(), // eg:  "2015-05-05T04:31:54.123Z"
                  // "uuid":      [String],       // <-- Universally unique identifier
                  // "event"      [String],       // <-- motionchange|geofence|heartbeat
                  // "is_moving": [Boolean],      // <-- The motion-state when location was recorded (@deprecated; use #event)
                  // "is_heartbeat: [Boolean],    // <-- If this location was recorded during heartbeat mode.
                  // "odometer": [Float/meters]
              }
            },
          withCredentials: true,
          }
        axios(config)
        .then((response) => {
          // console.log(response);
          count++;
        })
        .catch((err) => {
          throw new Error(err);
        });

      }, interval);

      intervalTracking.push({
        userId,
        intervalId,
      });

    });
  });
};

exports.stopWalker = (req, res) => {
  const userId = req.body.userId;

  userController.toggleWalkingOff(userId)
  .then(() => {
    const intId = _.remove(intervalTracking, (val) => val.userId === userId);
    clearInterval(intId[0].intervalId);

    res.send({
      walking: false,
    });
  })
  .catch((err) => {
    throw new Error(err);
  });
};

const userController = require('../controllers/userController');
const maps = require('../utils/mapsAPI');
const axios = require('axios');
const timeControls = require('../utils/timeControls');

exports.createWalker = (req, res) => {
  const { userId, origin, destination } = req.body;

  userController.getExtId(userId)
  .then((found) => {
    let count = 0;
    maps.getWalkRoute(origin, destination, (path) => {
      
      const intId = setInterval(() => {      
console.log('count: ', count)
        
        if (count + 1 === path.length) {
          console.log('done with walk:', count)
          clearInterval(intId);
        }

        const config = {
          url: `http://localhost:3000/bot`,
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
          console.log(response.data);
          count++
        });

      }, 1000)
    });
  });
};
const apiUrl = `${process.env.PROTOCOL}${process.env.LOCATION_IP}:${process.env.LOCATION_PORT}`;
const Yelp = require('yelp');
const axios = require('axios');
const userController = require('../controllers/userController');
// const faker = require('faker');

const yelp = new Yelp({
  consumer_key: process.env.YP_KEY,
  consumer_secret: process.env.YP_SECRET,
  token: process.env.YP_TOKEN,
  token_secret: process.env.YP_TOKEN_SECRET,
});

// See http://www.yelp.com/developers/documentation/v2/search_api
exports.search = (userId, index, offset, cb) => {
  yelp.search({ location: 'SF', offset })
  .then((data) => {
    // const img = data.businesses[index].image_url;
    // const img = faker.image.imageUrl();
    const lat = data.businesses[index].location.coordinate.latitude;
    const lng = data.businesses[index].location.coordinate.longitude;
    const name = data.businesses[index].name;

    userController.getExtId(userId)
    .then((found) => {
      const config = {
        url: `${apiUrl}/api/users/${found.extId}/places`,
        method: 'POST',
        data: {
          location: {
            name,
            lat,
            lng,
          },
          note: 'hard coded note',
        },
        withCredentials: true,
      };


      axios(config)
      .then((response) => {
        cb()
        console.log(response.data);
        //res.sendStatus(200);
      });
    })
    .catch((err) => {
      console.error(err);
    });
  });
}

const apiUrl = `${process.env.PROTOCOL}${process.env.API_IP}:${process.env.API_PORT}`;
const Yelp = require('yelp');
const axios = require('axios');
const userController = require('../controllers/userController');
const faker = require('faker');
let note = '';

const yelp = new Yelp({
  consumer_key: process.env.YP_KEY,
  consumer_secret: process.env.YP_SECRET,
  token: process.env.YP_TOKEN,
  token_secret: process.env.YP_TOKEN_SECRET,
});

// See http://www.yelp.com/developers/documentation/v2/search_api
exports.search = (userId, index, offset, location, cb) => {
  console.log('search location is: ', location);
  yelp.search({ location: location, offset })
  .then((data) => {

    const lat = data.businesses[index].location.coordinate.latitude;
    const lng = data.businesses[index].location.coordinate.longitude;
    const name = data.businesses[index].name;
    
    if (data.businesses[index].snippet_text) {
      note = data.businesses[index].snippet_text.split('\n')[0];
    } else {
      note = faker.lorem.sentences();
    }
    const imageUrl = faker.image.image();

    userController.getExtId(userId)
    .then((found) => {
      const config = {
        url: `${apiUrl}/api/users/${found.extId}/places`,
        method: 'POST',
        data: {
          name,
          lat,
          lng,
          note,
          imageUrl,
        },
        withCredentials: true,
      };

// console.log('in SEarch', location)
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
  })
  .catch(function (err) {
    console.error('yelp error? ', err);
  });;
}

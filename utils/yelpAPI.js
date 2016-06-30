// Load environment variables
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: './env/development.env' });
} else {
  require('dotenv').config({ path: './env/production.env' });
}

const Yelp = require('yelp');
const axios = require('axios');

const yelp = new Yelp({
  consumer_key: process.env.YP_KEY,
  consumer_secret: process.env.YP_SECRET,
  token: process.env.YP_TOKEN,
  token_secret: process.env.YP_TOKEN_SECRET,
});

// See http://www.yelp.com/developers/documentation/v2/search_api
exports.yelpSearch = () => {
  yelp.search({ location: 'SF' })
  .then((data) => {

    const img = data.businesses[5].image_url;
    const lat = data.businesses[5].location.coordinate.latitude;
    const lng = data.businesses[5].location.coordinate.longitude;
    const name = data.businesses[5].name;

    const config = {
      url: `http://localhost:7000/api/users/15/places`,
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
      console.log(response.data);
      //res.sendStatus(200);
    });
  })
  .catch(function (err) {
    console.error(err);
  });
}

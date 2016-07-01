const polyline = require('polyline');
const GoogleMapsAPI = require('googlemaps');

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: './env/development.env' });
} else {
  require('dotenv').config({ path: './env/production.env' });
}

// returns an array of lat, lon pairs
// const ret = polyline.decode('cigaAgli_N`CIt@?R@D?@?@A@ABE`@o@TU@CDEfA}ALQBEFKDMHYVcANo@@GJ]BIFWBE@A@ABCJG');

// console.log(ret);

const publicConfig = {
  key: process.env.GMAPS_KEY,
  stagger_time: 1000, // for elevationPath
  encode_polylines: false,
  secure: true, // use https
};

const gm = new GoogleMapsAPI(publicConfig);

// const directionParams = {
//   origin: '16 dellwood drive florham park nj',
//   destination: 'ridgedale middle school florham park nj',
//   mode: 'walking',
// };



exports.getWalkRoute = (origin, destination, cb) => {
  const directionParams = {
    origin,
    destination,
    mode: 'walking',
  };


  gm.directions(directionParams, (err, result) => {
      
    console.log(result)

    console.log( result.routes[0] );
    console.log( polyline.decode(result.routes[0].overview_polyline.points) );

    const path = polyline.decode(result.routes[0].overview_polyline.points);
    cb(path);

  });
};


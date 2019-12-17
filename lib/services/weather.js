const superagent = require('superagent');


const getForecast = (woeid, year, month, date) => {

  return superagent
    // .get(`https://www.metaweather.com/api/location/906057/2019/10/11/`)
    .get(`https://www.metaweather.com/api/location/${woeid}/${year}/${month}/${date}`)
    .then(res => {
      const { weather_state_name } = res.body[0];
      return weather_state_name;
    });
};

module.exports = { getForecast };

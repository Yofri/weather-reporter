const express = require('express');
const router = express.Router();

const Weather = require('../controllers/weatherController');

module.exports = router
  .post('/', Weather.createWeather),
  router
  .get('/', Weather.getWeather)
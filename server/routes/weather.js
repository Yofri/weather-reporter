const express = require('express');
const router = express.Router();
require('dotenv').config()
const DarkSky = require('dark-sky')
const darksky = new DarkSky(process.env.DARKSKY_KEY)

module.exports = router
  .get('/', async (req, res) => {
  try {
    const forecast = await darksky.options({
      latitude: -6.260676,
      longitude: 106.781605,
    }).get()
    res.status(200).send(forecast)
  } catch (err) {
    next(err)
  }
})
const express = require('express');
const router = express.Router();
require('dotenv').config()
const DarkSky = require('dark-sky')
const darksky = new DarkSky(process.env.DARKSKY_KEY)

module.exports = router
  .post('/', async (req, res) => {
    try {
      const forecast = await darksky.options({
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      }).get()
      res.status(200).send(forecast)
    } catch (err) {
      next(err)
    }
  })
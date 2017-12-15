const Weather = require('../models/weatherModel');
require('dotenv').config();
const DarkSky = require('dark-sky');
const darksky = new DarkSky(process.env.DARKSKY_KEY);

const ObjectID = require('mongodb').ObjectID;

let getWeather = (req, res) => {
    Weather.find({
        latitude: req.body.latitude
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err)=>{
        res.status(500).json(err);
    })
}

let createWeather = async (req, res) => {
    try {
        const forecast = await darksky.options({
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            time: new Date(),
            language: 'id',
            exclude: ['flags', 'hourly']
        }).get()

        //send email

        const newWeather = new Weather({
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            date : Date.now(),
            summary: forecast.daily.data[0].summary,
            icon: forecast.daily.data[0].icon

        });
        newWeather.save()
        .then(result => {
            res.status(200).send(forecast)
        })
        .catch(error => {
            res.status(500).json(error);
        });
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getWeather,
    createWeather  
}
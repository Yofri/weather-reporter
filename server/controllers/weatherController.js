const Weather = require('../models/weatherModel');
require('dotenv').config();
const DarkSky = require('dark-sky');
const darksky = new DarkSky(process.env.DARKSKY_KEY);

const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyD02q9joYeCyu3NdGWI-EW9FHq5qaMl0dM'
});

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

    const forecast = await darksky.options({
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        time: new Date(),
        language: 'id',
        exclude: ['flags', 'hourly']
    }).get()

    try {
        googleMapsClient.geocode({
            address: `${req.body.latitude} , ${req.body.longitude}`
        }, function (err, response) {
            if (!err) {
                // res.status(200).json(response.json.results[6].address_components[1].long_name);

                Weather.findOne({
                    location: response.json.results[6].address_components[1].long_name,
                    date : 15
                })
                .then((getLocation) => {
                    if (!getLocation){
                        const newWeather = new Weather({
                            userID: req.body.userID,
                            latitude: req.body.latitude,
                            longitude: req.body.longitude,
                            location: response.json.results[6].address_components[1].long_name,
                            date: 15,
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
                    }else{
                        res.status(200).send(getLocation)
                    }

                })
                .catch((err) => {
                    res.status(500).json(err);
                })
            }
        });
    } catch (err) {
        next(err)
    }
}

// let location = async (req, res) => {
//     googleMapsClient.geocode({
//         address: `${req.body.latitude} , ${req.body.longitude}`
//     }, function (err, response) {
//         if (!err) {
//             res.status(200).json(response.json.results[6].address_components[1].long_name);
//         }
//     });
// }

module.exports = {
    getWeather,
    createWeather
}
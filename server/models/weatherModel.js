const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const weatherSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    latitude : String,
    longitude : String,
    location : String,
    date: Number,
    summary : String,
    icon : String
});

const Weather = mongoose.model('Weather', weatherSchema);

module.exports = Weather;
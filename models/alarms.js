const { Schema, model } = require("mongoose");

const alarmSchema = Schema ({
    url: String,
    title: String,
    artist: String,
    genre: String,
    userID: String
})

const Alarm = model('Alarm', alarmSchema);

module.exports = Alarm;

const express = require('express');
const router = express.Router();
const Alarm = require('../models/alarms.js');
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

//ROUTES\\
const auth = async (req, res, next) => {
    console.log('Auth')
    try {
    const {authorization} = req.headers;
    if (authorization) {
            const token = authorization.split(' ')[1];
            const result = jwt.verify(token, SECRET)
            req.user = result;
            console.log('Verified')
            next();
    } else {
            res.send('NO TOKEN')
    }}
    catch(error) {
      res.send(error)
    }
  }

//Show\\
router.get('/', async (req, res) => {
    try {
        const alarms = await Alarm.find({userID: req.user.username});
        res.status(200).json(alarms);
    } catch(error) {
        res.status(400).json(error)
    }
});

router.get('/:id', async (req, res) => {
    try {
        const alarms = await Alarm.find({genre: req.params.id});
        res.status(200).json(alarms);
    } catch(error) {
        res.status(400).json(error)
    }
});

//CREATE\\
router.post('/', async (req, res) => {
    try {
        Alarm.create({url: req.body.url, userID: 'Belock', title: req.body.title, artist: req.body.artist, genre: req.body.genre});
    } catch(error) {
        res.status(400).json(error);
    }
})

//UPDATE\\
router.put('/:id', async (req, res) => {
    try {
        const updatedAlarm = await Alarm.findByIdAndUpdate(
            req.params.id, 
            req.body
            );
            res.status(200).json(updatedAlarm)
    } catch(error) {
        res.status(400).json(error);
    }
})

//DELETE\\
router.delete('/:id', async (req, res) => {
    try {
        await Alarm.findByIdAndDelete(req.params.id)
    } catch(error) {
        res.status(400).json(error);
    }
});

module.exports = router;
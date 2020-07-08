# beClock

Created by Bryce Belock

## About

An online alarm clock that allows you to select any buzzer/alarm sound for said clock from youtube, soundcloud, twitch, dailymotion, facebook, etc. If you don't want to use a url from another site the backend is serving up 10 of my favorite songs from a handful genres you can select.

## Back-End Setup

The back-end is written using mongoose/express, nodeJS in MVC format. Data is being stored using mongoDB. I also have the code to expand and impliment username/passwords and Json Web Tokens if I should ever feel the need to add authentication/authorization. This project's backend is a spitting image of my Shipperific API's backend just with updated models and controls.

### Repositories
[Front-End](https://github.com/Clobek/beClock)

[Back-End](https://github.com/Clobek/beClock_API)

### Hosts
[Front-End](https://beclock.netlify.app)

[Back-End](https://beclock.herokuapp.com/alarms/Rock) - I'm using Rock as the example of data to call, replacing Rock with Electronic, Rap etc will yield just those genres.

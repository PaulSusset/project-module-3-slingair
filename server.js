'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const request = require('request-promise')

const PORT = process.env.PORT || 8000;

const { userHandle, flightSeatingHandle, orderConfirmHandle, flightsHandle, seatInfo } = require('./handlers')

express()
    .use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })
	.use(morgan('dev'))
	.use(express.static('public'))
    .use(bodyParser.json())
    .use(express.urlencoded({extended: false}))
    
    // endpoints
    .get('/flight-seating/:flight', flightSeatingHandle)
    .post('/order-confirmation', orderConfirmHandle)
    .post('/user-confirm', userHandle)
    .get('/flights', flightsHandle)
    .get('/flights/:flight', seatInfo)

    .use((req, res) => res.send('Not Found'))
    .listen(PORT, () => console.log(`Listening on port ${PORT}`));

    
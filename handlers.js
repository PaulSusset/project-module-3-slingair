const { flights } = require('./test-data/flightSeating')

const confirmHandle = (req, res) => {
    res.send('yeah')
    console.log('yeah')
}
const flightSeatingHandle = (req, res) => {
    const flight = req.params.flight
    const flightDetails =  flights[flight]
    res.status(200).send(flightDetails)
}
const orderConfirmHandle = (req, res) => {
    
    console.log('req.body', req.body)
    res.send('all ok')
}

module.exports = { confirmHandle, flightSeatingHandle, orderConfirmHandle }
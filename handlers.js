const { flights } = require('./test-data/flightSeating')
const {  reservations } = require('./test-data/reservations')

const userHandle = (req, res) => {
    const id = req.body.id
    const user = reservations.find(userInfo => userInfo.id === id )
    res.status(200).send(JSON.stringify(user))
}
const flightSeatingHandle = (req, res) => {
    const flight = req.params.flight
    const flightDetails =  flights[flight]
    res.status(200).send(flightDetails)
}
const orderConfirmHandle = (req, res) => {
    //temporary until ID
    reservations.push(req.body)
    // locks seat
    flights[req.body['flight']].forEach(aSeat => {
        if(aSeat.id === req.body['seat'].toString()){
            aSeat.isAvailable = false;
        }})
    res.send(JSON.stringify({newID : '88a33c23-3332-4ef2-bd71-be7a6430485f'}))
}

module.exports = { userHandle, flightSeatingHandle, orderConfirmHandle }
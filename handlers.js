const { flights } = require('./test-data/flightSeating')
const {  reservations } = require('./test-data/reservations')
const request = require('request-promise')

const userHandle = (req, res) => {
    const id = req.body.id
    console.log('id', id)
    try {request({
        uri: `https://journeyedu.herokuapp.com/slingair/users/${id}`,
        method: 'GET',
        json: true
    }).then(user => {
        console.log('user',user)
        res.status(200).send(user)})}
    catch {error => console.log(error)}
}
const flightSeatingHandle = (req, res) => {
    const flight = req.params.flight
    const flightDetails =  flights[flight]
    res.status(200).send(flightDetails)
}
const orderConfirmHandle = (req, res) => {
    request({
        uri: 'https://journeyedu.herokuapp.com/slingair/users',
        method: 'POST',
        body: req.body,
        json: true
    }).then(data => {
        res.send(data)
    })
    // locks seat
    // flights[req.body['flight']].forEach(aSeat => {
    //     if(aSeat.id === req.body['seat'].toString()){
    //         aSeat.isAvailable = false;
    //     }})
    // res.send(JSON.stringify({newID : '88a33c23-3332-4ef2-bd71-be7a6430485f'}))
}
const flightsHandle = (req, res) => {
    request('https://journeyedu.herokuapp.com/slingair/flights')
    .then(data => {
        res.send(data)})
}

const seatInfo = (req, res) => {
    const flightInfo = req.params.flight
    request(`https://journeyedu.herokuapp.com/slingair/flights/${flightInfo}`)
    .then(data => {
        res.send(data)})
}
const adminSelectHandle = (req, res) => {
    const seat = req.query.seat
    const flight = req.query.flight
    let start = 0
    console.log('seat', seat)
    console.log('flight', flight)
    const ping = () => {
        request(`https://journeyedu.herokuapp.com/slingair/users?limit=25&start=${start}`)
        .then(data => JSON.parse(data))
            .then(data => {
                if(data.find(user => {
                    if(user !== null){
                    return user['flight'] === flight && user['seat'] === seat
                }})){
                    let seatData = data.find(user => {
                        return user['flight'] === flight && user['seat'] === seat
                    })
                    // console.log(seatData)
                    res.send(seatData)

                } else {
                    if (start < 200){
                        console.log('pinging again')
                    start += 25
                    console.log('start', start)
                    ping()
                    return
                } else { 
                    console.log('finished')
                    res.send(
                        {
                            email: 'NO DATA',
                            flight: flight,
                            givenName: 'NO DATA',
                            id: 'NO DATA',
                            seat: seat,
                            surname: 'NO DATA'
                          }
                    )
                }
                }
            })
    }
    ping()
}

module.exports = { userHandle, flightSeatingHandle, orderConfirmHandle, flightsHandle, seatInfo, adminSelectHandle }
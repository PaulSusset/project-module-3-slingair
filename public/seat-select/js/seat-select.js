const flightInput = document.getElementById('flight');
const existing = document.getElementById('existing');
const seatsDiv = document.getElementById('seats-section');
const confirmButton = document.getElementById('confirm-button');

let selection = '';
let flightNumber = undefined

const flightOptions = () => {
    fetch('/flights', 
    {method: "GET",
    headers: {
        'Accept': "application/JSON",
        "Content-Type": "application/json"
    }})
    .then(data => {
        return data.json()})
    .then(flightArr => {
        flightArr['flights'].forEach(flight => {
            const option = document.createElement('option')
            option.innerText = flight
            document.getElementById('flight').appendChild(option)
        })
    })
}
flightOptions()

const renderSeats = (seatAvailability) => {
    if (document.querySelector('#row')){
    document.querySelector('ol').remove()}
    document.querySelector('.form-container').style.display = 'block';
    const seats = seatAvailability[flightNumber]
    const alpha = ['A', 'B', 'C', 'D', 'E', 'F'];
    for (let r = 1; r < 11; r++) {
        const row = document.createElement('ol');
        row.classList.add('row');
        row.classList.add('fuselage');
        row.id = 'row'
        seatsDiv.appendChild(row);
        for (let s = 1; s < 7; s++) {
            const seatNumber = `${r}${alpha[s-1]}`;
            const seat = document.createElement('li')
            const seatCheck = seats.find(num => num.id === seatNumber)
            if (seatCheck.isAvailable){
                const seatAvailable = `<li><label class="seat"><input type="radio" name="seat" value="${seatNumber}" /><span id="${seatNumber}" class="avail">${seatNumber}</span></label></li>`        
                seat.innerHTML = seatAvailable;
            } else {
                const seatOccupied = `<li><label class="seat"><span id="${seatNumber}" class="occupied">${seatNumber}</span></label></li>`;
                seat.innerHTML = seatOccupied
            }
            row.appendChild(seat);
        }
    }
    
    let seatMap = document.forms['seats'].elements['seat'];
    seatMap.forEach(seat => {
        seat.onclick = () => {
            selection = seat.value;
            seatMap.forEach(x => {
                if (x.value !== seat.value) {
                    document.getElementById(x.value).classList.remove('selected');
                }
            })
            document.getElementById(seat.value).classList.add('selected');
            document.getElementById('seat-number').innerText = `(${selection})`;
            confirmButton.disabled = false;
        }
    });
}


const toggleFormContent = () => {
    flightNumber = flightInput.value;
    console.log(flightNumber);
    // if (flightNumber.length === 5 && flightNumber.substring(0,2) === 'SA' && flightNumber.substring(2) > 0){
    // document.getElementById('error').classList.add('displayNone')
    fetch(`/flights/${flightNumber}`, {
    method: "GET", 
    headers: {
        'Accept': "application/JSON",
        "Content-Type": "application/json"
    }}).then(data => data.json())
    .then(deets => renderSeats(deets));
    // else { document.getElementById('error').classList.remove('displayNone')}
}

const handleConfirmSeat = (event) => {
    event.preventDefault();
    const reqBody = {flight: flightNumber,
            seat: selection,
        givenName : givenName.value,
        surname: surname.value,
        email : email.value}
    fetch('/order-confirmation', {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: {
            "Accept": "application/JSON",
            "Content-Type": "application/json"
    }
    }).then(data => {
        return data.json()})
    .then(data => {
        window.location.href = `http://localhost:8000/seat-select/confirmed.html?id=${data['reservation']['id']}`
    })
}
const userPageHandle = (event) => {
    event.preventDefault()
    const idString = event.target.elements.yourId.value;
    window.location.href = `http://localhost:8000/seat-select/confirmed.html?id=${idString}`
}
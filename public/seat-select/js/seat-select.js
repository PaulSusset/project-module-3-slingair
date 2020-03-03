const flightInput = document.getElementById('flight');
const existing = document.getElementById('existing');
const seatsDiv = document.getElementById('seats-section');
const confirmButton = document.getElementById('confirm-button');

let selection = '';
let flightNumber = undefined

const renderSeats = (seatAvailability) => {
    document.querySelector('.form-container').style.display = 'block';
    const seats = seatAvailability
    const alpha = ['A', 'B', 'C', 'D', 'E', 'F'];
    for (let r = 1; r < 11; r++) {
        const row = document.createElement('ol');
        row.classList.add('row');
        row.classList.add('fuselage');
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
    console.log('toggleFormContent: ', flightNumber);
    if (flightNumber.length === 5 && flightNumber.substring(0,2) === 'SA' && flightNumber.substring(2) > 0){
        document.getElementById('error').classList.add('displayNone')
    fetch(`/flight-seating/${flightNumber}`, 
    {method: "GET",
    headers: {
        'Accept': "application/JSON",
        "Content-Type": "application/json"
    }}).then(data => data.text()).then(data => {
        return JSON.parse(data)
    })
    // TODO: contact the server to get the seating availability
    //      - only contact the server if the flight number is this format 'SA###'.
    //      - Do I need to create an error message if the number is not valid?
    
    .then(deets => renderSeats(deets));}
    else { document.getElementById('error').classList.remove('displayNone')}
}

const handleConfirmSeat = async (event) => {
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
    }).then(data => data.json())
    .then(data =>{
        window.location.href = `http://localhost:8000/seat-select/confirmed.html?id=${data['newID']}`
    })
}
const userPageHandle = (event) => {
    const id = id.value;
    console.log(id)
    window.location.href = `http://localhost:8000/seat-select/confirmed.html?id=${id}`
}

flightInput.addEventListener('blur', toggleFormContent);
existing.addEventListener('click', userPageHandle)

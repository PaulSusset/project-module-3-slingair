const id = window.location.search.slice(4)
console.log(id)
fetch('/user-confirm', {
    method: 'POST',
    body: JSON.stringify({id}),
    headers: {
        'Accept': "application/JSON",
        "Content-Type": "application/json"
    }}).then(data => data.json())
    .then(user => {
        document.getElementById('flight').innerText = user['data']['flight']
        document.getElementById('seat').innerText = user['data']['seat']
        document.getElementById('name').innerText = `${user['data']['givenName']} ${user['data']['surname']}`
        document.getElementById('email').innerText = user['data']['email']
    })


const userPageHandle = (event) => {
    event.preventDefault()
    const idString = event.target.elements.yourId.value;
    window.location.href = `http://localhost:8000/seat-select/confirmed.html?id=${idString}`
}
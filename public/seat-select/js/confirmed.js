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
        console.log(user)
        document.getElementById('flight').innerText = user['flight']
        document.getElementById('seat').innerText = user['seat']
        document.getElementById('name').innerText = `${user['givenName']} ${user['surname']}`
        document.getElementById('email').innerText = user['email']
    })
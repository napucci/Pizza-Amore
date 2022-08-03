const eventSection = document.getElementById('catering-events')
const submitBtn = document.getElementById('submit')
const date = document.getElementById('date')
const firstName = document.getElementById('first-name')
const lastName = document.getElementById('last-name')
const type = document.getElementById('catering-options')
const place = document.getElementById('location')

function getEvents() {
  axios.get('/api/events/')
  .then(res => {
    eventSection.innerHTML = '';
    const {data} = res
    console.log(data)
    createEventCard(data)
   // loops through events and displays on cartering.html
})
}

function createEventCard(data) {
  for (let i = 0; i < data.length; i++){
    let newEvent = document.createElement('div'); 
    newEvent.className = 'event-div'; 
    newEvent.innerHTML = 
    `<p>${data[i].date}</p>
    <p>${data[i].firstName}</p>
    <p>${data[i].lastName}</p>
    <p>${data[i].type}</p>
    <p>${data[i].location}</p>
    <p>${data[i].status}</p>`
    eventSection.appendChild(newEvent);
    }
  
}

function addToCaterDb(body) {
  console.log('hitting function')
  axios.post('/api/events/', body)
  .then(res => {
    console.log(res.data)
    createEventCard(res.data)
})
}

function addEvent(e) {
 e.preventDefault()
  let newCater = {
    firstName: firstName.value,
    lastName: lastName.value, 
    date: date.value, 
    type: type.value, 
    location: place.value, 
  }
  addToCaterDb(newCater); 
  firstName.value = ''; 
  lastName.value = ''; 
  date.value = ''; 
  location.value = '';
}


submitBtn.addEventListener('submit', addEvent)
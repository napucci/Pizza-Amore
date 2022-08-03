const cater = require('./catering.json')
let globalId = 0; 

module.exports = {
  getEvents: (req, res) => {
    res.status(200).send(cater); 
  }, 
  addEventToDb: (req, res) => {
    const {firstName, lastName, date, type, location} = req.body; 
    let newCater = {
      firstName: firstName,
      lastName: lastName, 
      date: date, 
      type: type, 
      location: location, 
      status: 'Pending'
    }
    cater.push(newCater);
    console.log(cater)
    globalId++
    res.status(200).send(cater)
  }
}
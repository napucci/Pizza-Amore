// Middleware
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express()

app.use(express.json());
app.use(cors())
// access cart controller functions
const {getCart, addToCartDb, deleteItem, updateQuantity} = require('./controller')

app.get('/api/cart/', getCart); 
app.post('/api/cart/', addToCartDb); 
app.delete('/api/cart/:id', deleteItem);
app.put('/api/cart/:id', updateQuantity);



// access cater controller functions 
const {getEvents, addEventToDb} = require('./caterController')

app.get('/api/events/', getEvents); 
app.post('/api/events/', addEventToDb); 


// include and initialize the rollbar library with your access token
const Rollbar = require("rollbar");
const rollbar = new Rollbar({
  accessToken: 'cc64d550131b463386a1f4fbeb5a6fb1',
  captureUncaught: true,
  captureUnhandledRejections: true
});

// record a generic message and send it to Rollbar
rollbar.log("Hello world!");

// Use rollbar error messages
app.use(rollbar.errorHandler())

// Deploy html pages 
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../public/menu.html'))
})

// Deploy CSS and JS
app.use(express.static(path.join(__dirname, '../public')))

// Connect to heroku port
const port = process.env.PORT || 4005

// Connect to port 
app.listen(port, () => {console.log(`Listening on port ${port}`)})

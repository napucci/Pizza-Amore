require('dotenv').config()
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express()

app.use(express.json());
app.use(cors())

const {getCart, addToCartDb, deleteItem, updateQuantity} = require('./controller')

app.get('/api/cart/', getCart); 
app.post('/api/cart/', addToCartDb); 
app.delete('/api/cart/:id', deleteItem);
app.put('/api/cart/:id', updateQuantity);

const {getEvents, addEventToDb} = require('./caterController')

app.get('/api/events/', getEvents); 
app.post('/api/events/', addEventToDb); 

const Rollbar = require("rollbar");
const rollbar = new Rollbar({
  accessToken: 'cc64d550131b463386a1f4fbeb5a6fb1',
  captureUncaught: true,
  captureUnhandledRejections: true
});

rollbar.log("Hello world!");

app.use(rollbar.errorHandler())

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../public/home.html'))
})

app.use(express.static(path.join(__dirname, '../public')))

const port = process.env.PORT || 4005

app.listen(port, () => {console.log(`Listening on port ${port}`)})

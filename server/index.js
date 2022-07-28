const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express()

// include and initialize the rollbar library with your access token
const Rollbar = require("rollbar");
const rollbar = new Rollbar({
  accessToken: 'cc64d550131b463386a1f4fbeb5a6fb1',
  captureUncaught: true,
  captureUnhandledRejections: true
});

// record a generic message and send it to Rollbar
rollbar.log("Hello world!");

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

const food = ['cheese', 'pepperoni', 'veggie']

app.get('/api/cater', (req, res) => {
   try { rollbar.log('Success!')
    res.status(200).send(food)
}
catch  (err) {
    rollbar.warning('Food was not found!', err)
}
})



app.use(express.static(path.join(__dirname, '../public')))

const port = process.env.PORT || 4005

app.use(rollbar.errorHandler())

app.listen(port, () => {console.log(`Listening on port ${port}`)})

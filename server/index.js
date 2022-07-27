const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express()

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../index.html'))
})


app.use(express.static(path.join(__dirname, '../public')))

const port = process.env.PORT || 4005

app.listen(port, () => {console.log(`Listening on port ${port}`)})

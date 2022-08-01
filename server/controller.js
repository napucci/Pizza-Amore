// Connect to cart database
const cart = require('./db.json')

// cart id 
let globalId = 3; 

// functions being used in index.js
module.exports = {
  getCart: (req, res) => {
    res.status(200).send(cart)
  }, 

  addToCartDb: (req, res) => {
    const {item} = req.body; 
    let newItem = {
      id: globalId, 
      item: item
    }
    cart.push(newItem); 
    globalId++
    res.status(200).send(cart)
  }
}
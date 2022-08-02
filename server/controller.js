// Connect to cart database
const cart = require('./db.json')

// cart id 
let globalId = 1; 

// functions being used in index.js
module.exports = {
  getCart: (req, res) => {
    res.status(200).send(cart)
  }, 

  addToCartDb: (req, res) => {
    const {item, quantity} = req.body; 
    let newItem = {
      id: globalId, 
      item: item,
      quantity: quantity
    }
    cart.push(newItem); 
    globalId++
    res.status(200).send(cart)
  }, 

  deleteItem: (req, res) => {
    let index = cart.findIndex(item => item.id === +req.params.id); 
    cart.splice(index, 1); 
    res.status(200).send(cart); 
  }, 
  updateQuantity: (req, res) => {
    let index = cart.findIndex(item => item.id === +req.params.id)
    const {type} = req.body; 
    if(type === 'minus' && cart[index].quantity > 0){
      cart[index].quantity -= 1; 
      res.status(200).send(cart)
    }
    else {
      cart[index].quantity += 1; 
      res.status(200).send(cart)
    }
  }
}
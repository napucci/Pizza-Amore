// Connect to cart database
const cart = require('./cart.json')

// cart id 
let globalId = 1; 

// functions being used in index.js
module.exports = {
  getCart: (req, res) => {
    res.status(200).send(cart)
  }, 

  addToCartDb: (req, res) => {
    const {item, quantity, price} = req.body; 
    let newItem = {
      id: globalId, 
      item: item,
      quantity: quantity,
      price: price
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
      if(cart[index].item === 'Pizza'){
        cart[index].price -= 12
      }
      else if(cart[index].item === 'Salad'){
        cart[index].price -= 7
      }
      else if(cart[index].item === 'Sub'){
        cart[index].price -= 9
      }
      else if(cart[index].item === 'Drink'){
        cart[index].price -= 3
      }
      res.status(200).send(cart)
    }
    else if (type === 'plus' && cart[index].quantity < 20) {
      cart[index].quantity += 1; 
      if(cart[index].item === 'Pizza'){
        cart[index].price += 12
      }
      else if(cart[index].item === 'Salad'){
        cart[index].price += 7
      }
      else if(cart[index].item === 'Sub'){
        cart[index].price += 9
      }
      else if(cart[index].item === 'Drink'){
        cart[index].price += 3
      }
      res.status(200).send(cart)
    }
    else if(type === 'minus' && cart[index].quantity === 0) {
      res.status(400).send("Quantity cannot go lower")
    }
    else {
      res.status(400).send('Quantity cannot go higher')
    }
  }
}
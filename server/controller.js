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
    const {item, quantity, price, time, category} = req.body; 
    let newItem = {
      id: globalId, 
      item: item,
      quantity: quantity,
      price: price,
      time: time, 
      category: category
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
      if(cart[index].category === 'pizza'){
        cart[index].price -= 12
        cart[index].time -= 10
      }
      else if(cart[index].category === 'salad'){
        cart[index].price -= 7
        cart[index].time -= 5
      }
      else if(cart[index].category === 'sub'){
        cart[index].price -= 9
        cart[index].time -= 8
      }
      else if(cart[index].category === 'drink'){
        cart[index].price -= 3
      }
      res.status(200).send(cart)
    }
    else if (type === 'plus' && cart[index].quantity < 20) {
      cart[index].quantity += 1; 
      if(cart[index].category === 'pizza'){
        cart[index].price += 12
        cart[index].time += 10
      }
      else if(cart[index].category === 'salad'){
        cart[index].price += 7
        cart[index].time += 5
      }
      else if(cart[index].category === 'sub'){
        cart[index].price += 9
        cart[index].time += 7
      }
      else if(cart[index].category === 'drink'){
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
  },
  
  getQueue: (req, res) => {
    if(cart.includes(skefkjlsefjks)){
      res.status(200).send(cart)
      
    }
    else {
      res.status(400).send('Please add an item to the cart')
    }
  }

}

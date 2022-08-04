
// cart page elements
const cartBtn = document.getElementById('cart-button'); 
const cartSection = document.getElementById('cart-section'); 
const submitOrder = document.getElementById('cart-checkout'); 
const queue = document.getElementById('queue');


// cart page functions
function getCart() {
  axios.get('/api/cart/')
  .then(res => {
    cartSection.innerHTML = '';
    const {data} = res
    console.log(data)
    createCartCard(data)
    
  })
}


// loops through cart and displays on cart.html
function createCartCard(data){
  for (let i = 0; i < data.length; i++){
    let newCart = document.createElement('div'); 
    newCart.className = 'cart-div'; 
    newCart.innerHTML = `
    <p>${data[i].item}</p>
    <button onclick="updateQuantity(${data[i].id}, 'minus')">-</button>
    <p class="item-quantity">${data[i].quantity}</p>
    <button onclick="updateQuantity(${data[i].id}, 'plus')">+</button>
    <p class="item-price">$${data[i].price}</p> 
    <button id="deletebtn" onclick="deleteItem(${data[i].id})">delete</button>`
    cartSection.appendChild(newCart);
    }
}

// deletes cartItem from database
function deleteItem(id) {
  axios.delete(`/api/cart/${id}`)
  .then(res => {
    getCart();
  })
}


// changes amount of an item users wants in the cart
function updateQuantity(id, type) {
  axios.put(`/api/cart/${id}`, {type})
  .then(res => {
    getCart()
  })
  .catch (err => {
    alert(err.response.data)
  })
}

// Make queue card
function createQueueCard(data) {
  for(let i = 0; i < data.length; i++){
    let newItem = document.createElement('p'); 
    newItem.className = 'queue-div'
    newItem.innerHTML = `<div id="item-name">${data[i].quantity} ${data[i].item}(s)</div> <div id="item-price">$${data[i].price * data[i].quantity}</div>`
    queue.appendChild(newItem)
  }
  let subtotal = 0
  data.forEach(item => subtotal += item.price * item.quantity)
  const totalStatement = document.createElement('div');
  totalStatement.className = 'queue-div'
  const tax = parseFloat(subtotal * .06).toFixed(2); 
  const total = parseFloat(subtotal + (subtotal * .06)).toFixed(2)
  const totals = [subtotal, tax, total]
  const totalTitles = ['Subtotal', 'Tax', 'Total']
  for(let i = 0; i < totals.length; i++){
    let newTotal = document.createElement('p')
    newTotal.className = 'queue-div'
    newTotal.innerHTML = `<div id="item-name">${totalTitles[i]}</div> <div id="item-price">$${totals[i]}</div>`
    queue.appendChild(newTotal)
  }
}

// Get cart data and put in queue 
function getQueue() {
  axios.get('/api/cart/')
  .then(res => {
    console.log(res.data)
    createQueueCard(res.data)
    for(let i =0; i < res.data.length; i++){
      deleteItem(res.data[i].id)
    }
  })
}



//cart page listeners
document.addEventListener('DOMContentLoaded', getCart)
submitOrder.addEventListener('click', getQueue)
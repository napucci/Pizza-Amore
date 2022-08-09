const cartSection = document.getElementById('cart-section'); 
const queue = document.getElementById('queue');



function getCart() {
  axios.get('/api/cart/')
  .then(res => {
    cartSection.innerHTML = '';
    const {data} = res
    console.log(data)
    createCartCard(data)
    
  })
}

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
    const submitOrder = document.createElement('button')
    submitOrder.className = 'cart-checkout'
    submitOrder.innerText = "Submit Order"
    submitOrder.type = 'submit'
    submitOrder.addEventListener('click', getQueue)
    cartSection.appendChild(submitOrder)
}

function deleteItem(id) {
  axios.delete(`/api/cart/${id}`)
  .then(res => {
    getCart();
  })
}


function updateQuantity(id, type) {
  axios.put(`/api/cart/${id}`, {type})
  .then(res => {
    getCart()
  })
  .catch (err => {
    alert(err.response.data)
  })
}


function createQueueCard(data) {
  for(let i = 0; i < data.length; i++){
    let newItem = document.createElement('p'); 
    newItem.className = 'queue-div'
    newItem.innerHTML = `<div id="item-name">${data[i].quantity} ${data[i].item}(s)</div> <div id="item-price">$${data[i].price}</div>`
    queue.appendChild(newItem)
  }

  let subtotal = 0
  data.forEach(item => subtotal += item.price)
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

  let timeTotal = 0; 
  for(let i = 0; i < data.length; i++){
    timeTotal += data[i].time 
  }
 let completedStatement = document.createElement('p')
 completedStatement.innerText = `Your order is being processed. Estimated wait time is ${timeTotal} mins.`
 completedStatement.className = 'time-statement'
 queue.appendChild(completedStatement)
}


async function getQueue() {
cartSection.remove()
queue.style.display = 'flex'
 console.log(cartSection)
  axios.get('/api/cart/')
  .then(res => {
    console.log(res.data)
    createQueueCard(res.data)
    for(let i =0; i < res.data.length; i++){
      deleteItem(res.data[i].id)
    }
    
  })
}

document.addEventListener('DOMContentLoaded', getCart)

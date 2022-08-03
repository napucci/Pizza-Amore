
// cart page elements
const cartBtn = document.getElementById('cart-button'); 
const cartSection = document.getElementById('cart-section'); 


// cart page functions
function getCart() {
  axios.get('/api/cart/')
  .then(res => {
    cartSection.innerHTML = '';
    const {data} = res
    console.log(data)
   // loops through cart and displays on cart.html
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
  })
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

//cart page listeners
cartBtn.addEventListener('click', getCart)
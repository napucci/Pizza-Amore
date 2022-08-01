
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
    newCart.innerHTML = `<p>${data[i].item}</p><button id="deletebtn" onclick="deleteItem(${data[i].id})">delete</button>`
    cartSection.appendChild(newCart);
    }
  })
}

function deleteItem(id) {
  axios.delete(`/api/cart/${id}`)
  .then(res => {
    getCart();
  })
}

//cart page listeners
cartBtn.addEventListener('click', getCart)
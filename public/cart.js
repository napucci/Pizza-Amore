
// cart page elements
const cartBtn = document.getElementById('cart-button'); 
const cartSection = document.getElementById('cart-section'); 


// cart page functions
function getCart() {
  axios.get('/api/cart/')
  .then(res => {
    const {data} = res
    console.log(data)
   // loops through cart and displays on cart.html
    for (let i = 0; i < data.length; i++){
    let newCart = document.createElement('div'); 
    newCart.innerHTML = data[i].item; 
    cartSection.appendChild(newCart); 
    }
  })
}

//cart page listeners
cartBtn.addEventListener('click', getCart)

// home page buttons
const pizzabtn = document.getElementById('pizza-btn'); 
const saladbtn = document.getElementById('salad-btn')
const subsbtn = document.getElementById('subs-btn')
const drinksbtn = document.getElementById('drinks-btn')



// catering page buttons
const submitbtn = document.getElementById('submit')


// home page functions
const addToCartDb = (body) => {
  axios.post('/api/cart/', body)
  .then(res => {
    console.log('success')

  })
}

const addToCart = (e) => {
  let newItem = {
    item: e.target.innerText,
    quantity: 1
  }; 
  addToCartDb(newItem); 
  alert(`${e.target.innerText} has been added to cart!`)
  
}




// home page listeners
pizzabtn.addEventListener('click', addToCart); 
saladbtn.addEventListener('click', addToCart)
subsbtn.addEventListener('click', addToCart)
drinksbtn.addEventListener('click', addToCart)




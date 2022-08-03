
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
    quantity: 1,
    price: 0, 
    time: 0
  };
  const {item, time, quantity, price} = newItem;  
  if(item === 'Pizza'){
    newItem.price = 12
  }
  else if(item === 'Salad'){
    newItem.price = 7
  }
  else if(item === 'Sub'){
    newItem.price = 9
  }
  else {
    newItem.price = 3
  };
  if(item === 'Pizza'){
    newItem.time = quantity * 10
  }
  else if(item === 'Salad'){
    newItem.time = quantity * 5
  }
  else if(item === 'Sub'){
    newItem.time = quantity * 8
  }
  else {
    newItem.time = 0
  }
  addToCartDb(newItem); 
  alert(`${e.target.innerText} has been added to cart!`)
  
}




// home page listeners
pizzabtn.addEventListener('click', addToCart); 
saladbtn.addEventListener('click', addToCart)
subsbtn.addEventListener('click', addToCart)
drinksbtn.addEventListener('click', addToCart)





// home page buttons 
const menuBtns = document.querySelectorAll('.menu-button')



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
  // Create new item in cart DB
 
  let newItem = {
    item: e.target.innerText,
    quantity: 1,
    price: 0, 
    time: 0, 
    category: ''
  };
  // Add specific prices and estimated time
 
  const {item, quantity, category} = newItem;  
  if(item ==='Cheese' || item === 'Veggie' || item === 'Pepperoni'|| item === 'Buffalo Chicken'){
    newItem.category = 'pizza'
    newItem.price = 12
  }
  else if(item.includes('Salad') || item === 'Antipasto'){
    newItem.category = 'salad'
    newItem.price = 7
  }
  else if(item === 'Italian Sub' || item === 'Turkey Club' || item === 'Roast Beef & Swiss' || item === 'Veggies & Hummus'){
    newItem.category = 'sub'
    newItem.price = 9
  }
  else {
    newItem.category = 'drink'
    newItem.price = 3
  };
  if(category === 'pizza'){
    newItem.time =  10
  }
  else if(category === 'salad'){
    newItem.time =  5
  }
  else if(category === 'sub'){
    newItem.time =  6
  }
  else {
    newItem.time = 0
  }
  addToCartDb(newItem); 
  alert(`${e.target.innerText} has been added to cart!`)
  
}




// home page listeners
for(let btn of menuBtns){
  btn.addEventListener('click', addToCart)
}







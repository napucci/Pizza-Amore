const pizzabtn = document.getElementById('pizza-btn'); 
const saladbtn = document.getElementById('salad-btn')
const subsbtn = document.getElementById('subs-btn')
const drinksbtn = document.getElementById('drinks-btn')
const caterbtn  = document.getElementById('cater')

const getFood = () => axios.get('/api/cater').then(res => alert(res.data)).catch(err => console.log(err)) 


pizzabtn.addEventListener('click', () => alert('Pizza!'))
saladbtn.addEventListener('click', () => alert('Salad!'))
subsbtn.addEventListener('click', () => alert('Subs!'))
drinksbtn.addEventListener('click', () => alert('Drinks!'))
caterbtn.addEventListener('click', getFood)



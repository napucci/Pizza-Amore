const pizzabtn = document.getElementById('pizza-btn'); 
const saladbtn = document.getElementById('salad-btn')
const subsbtn = document.getElementById('subs-btn')
const drinksbtn = document.getElementById('drinks-btn')
const rollbarbtn = document.getElementById('rollbar')



pizzabtn.addEventListener('click', () => alert('Pizza!'))
saladbtn.addEventListener('click', () => alert('Salad!'))
subsbtn.addEventListener('click', () => alert('Subs!'))
drinksbtn.addEventListener('click', () => alert('Drinks!'))
rollbarbtn.addEventListener('click', goHome)

const goHome = () => {
  axios.get('http://localhost:4005/home').then(res => {
  console.log('Nice work')
})
}

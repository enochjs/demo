// const 
// const Promise = require('./index')
const a = new Promise((re) => {re(11111)})

console.log('........')

a.then((result) => {
  a.then(re => {
    console.log('........', re)
  })
  console.log('result')
})
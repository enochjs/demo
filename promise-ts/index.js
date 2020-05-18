
// const Promise = require('./dist/index')

// console.log('.....', Promise)

// var d = Promise.deferred();
// test(d.promise, done);
// d.reject('1111');
// d.resolve('3333');

const a = new Promise((re, rj) => {
  re('23')
})

const b = a.then((result) => {
  console.log('b result', result)
  return `a-b-${result}`
}, (reason) => {
  console.log('b reject', reason)
  return `a-b-${reason}`
})

const c = b.then((result) => {
  console.log('c result', result)
  return `b-c-${result}`
}, (reason) => {
  console.log('c reject', reason)
  return `b-c-${reason}`
})

const d = a.then((result) => {
  console.log('d result', result)
  return `a-d-${result}`
}, (reason) => {
  console.log('d reject', reason)
  return `a-d-${reason}`
})

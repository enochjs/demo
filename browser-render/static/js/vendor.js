console.log('this is vendor js excute, time=', performance.now())

setTimeout(() => {
  // console.log('test h3 dom', document.querySelector('h3').style)
  const element = document.querySelector('h3')
  // const style = getComputedStyle(element)
  const style = getComputedStyle(element).color
  console.log('.....style timeout', style)
}, 1000)

window.onload = function () {
  const element = document.querySelector('h3')
  const style = getComputedStyle(element).color
  console.log('.....style onload', style)
}


document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded, time=', performance.now())
  // console.log('test h3 dom', document.querySelector('h3').style.color)
  const element = document.querySelector('h3')
  const style = getComputedStyle(element).color
  console.log('.....style DOMContentLoaded', style)
})
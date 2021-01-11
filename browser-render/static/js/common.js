console.log('this is common js excute, time=', performance.now())

// const dom = document.getElementById('name');
// dom.style.left = '100px';
// dom.style.top = '100px';
let time = new Date().getTime()
let count = 0
while(1) {
  const current = new Date().getTime()
  if (current - time > 1000) {
    const div = document.createElement('div')
    div.className = 'name'
    div.style.left = `${100 * count}px`;
    div.style.top = `${100 * count}px`;
    document.body.append(div)
    count += 1
    time = new Date().getTime()
    if (count > 5) { 
      break;
    }

  }
}
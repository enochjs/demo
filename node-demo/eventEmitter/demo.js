class EventEmmit {

  constructor() {
    this._queue = {}
    this._count = 0
  }

  on (eventName, callback) {
    if (!this._queue[eventName]) {
      this._queue[eventName] = []
    }
    this._queue[eventName].push(callback)
  }

  emit (eventName, ...args) {
    if (this._queue[eventName]) {
      this._queue[eventName].forEach(callback => {
        callback(...args)
      });
    }
  }

}

const constom = new EventEmmit()

constom.on('test', function test(arg1, arg2) {
  console.log('....test', arg1, arg2)
})

constom.on('test', async function test(...args) {
  
  const reuslt = await new Promise((re) => {
    re('....promise')
  })
  console.log(reuslt, args)

})

constom.on('test2', function test(...args) {
  console.log('....test2', args)
})

constom.emit('test', 1, 2, 3, 4, 5)
constom.emit('test2', 'A', 'B', 'C', 'D', 'E')
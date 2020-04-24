// promise todo

const thenAble = (target) => target && typeof target.then === 'function'

class PromiseTs {
  constructor(callback) {
    this._state = 'pending'
    this._value = null
    this._resolveQueue = []
    this._rejectQueue = []
    callback(this.onFulfilled.bind(this), this.onRejected.bind(this))
    return this
  }

  onFulfilled(result) {
    this._value = result
    setTimeout(() => {
      while(this._resolveQueue.length) {
        const fun = this._resolveQueue.shift()
        if (thenAble(this._value)) {
          this._value.then(fun).then((re) => this._value = re)
        } else {
          this._value = fun(this._value)
        }
      }
      this._state = 'fulfilled'
    }, 0);
  }

  onRejected(result) {
    setTimeout(() => {
      this._value = result
      while(this._rejectQueue.length) {
        const fun = this._rejectQueue.shift()
        this._value = thenAble(result) ? result.then(fun) : fun(result)
      }
    }, 0);
    this._state = 'rejected'
  }

  then (onFulfilled, onRejected) {
    if (this._state === 'fulfilled') {
      onFulfilled(this._value)
    }
    typeof onFulfilled === 'function' && this._resolveQueue.push(onFulfilled)
    typeof onRejected === 'function' && this._rejectQueue.push(onRejected)
    return this
  }

  static resolve (result) {
    return new PromiseTs((resolve) => {
      resolve(result)
    })
  }

  static reject (result) {
    return new PromiseTs((resolve) => {
      resolve(result)
    })
  }

  static deferred() {
    const deferred = {}
    deferred.promise = new Promise((resolve,reject) => {
        deferred.resolve = resolve
        deferred.reject = reject
    });
    return deferred
  }

  static all (promiseList) {
    let results = new Array(promiseList.length)
    let count = 0
    return new PromiseTs((resolve, reject) => {
      promiseList.forEach((item, index) => {
        item.then((result) => {
          results[index] = result
          count ++
          if (count === promiseList.length) {
            resolve(results)
          }
        })
      }, (error) => {
        reject(error)
      })
    })
  }
}

// module.expo

// let b = new PromiseTs((resolve, reject) => {
//   const a = new PromiseTs((re) => {
//     setTimeout(() => {
//       console.log('......timeout one')
//       re('promisetPromiseTstPromiseTs')
//     }, 1000);
//   })
//   // setTimeout(() => {
//   //   resolve(JSON.stringify({ a: 1, b: 2, c: 3}))
//   // }, 3000);
  
//   resolve(a)
// }).then((result) => {
//   return new PromiseTs((re) => {re(12345)})
// }).then((result) => {
//   console.log('result end', result)
//   return result
// })

module.exports = PromiseTs



// setTimeout(() => {
//   b.then((re) => {
//     console.log('re', re)
//   })
// }, 3000)

// let a = new PromiseTs((re) => { re(true) })

// a.then((re) => {
//   console.log('.....', re)
//   return 121212
// })

// let c = new PromiseTs((re) => { setTimeout(() => {
//   re(true)
// }, 1000); })

// PromiseTs.all([a,b, c]).then((result) => {
//   console.log(result)
// })


// function aaa (param: number) {
//   return param + 1
// }

// function bbb (param: number) {
//   return param + 1
// }

// function ccc (param: number) {
//   return param + 1
// }


// const a = [aaa, bbb, ccc].reduce((a, b) => { console.log(a, b);return b(a)}, 100)



// console.log('....a', b)
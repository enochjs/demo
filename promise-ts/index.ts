// promise todo

class PromiseTs {

  private _state: 'pending' | 'fulfilled' | 'rejected'
  private _resolveQueue: Array<any> = []
  private _rejectQueue: Array<any> = []

  constructor(callback: (resolve: any, reject: any) => any) {
    this._state = 'pending'
    callback(this.onFulfilled.bind(this), this.onRejected.bind(this))
  }

  private onFulfilled(result: any) {
    if (this._state === 'pending') {
      setTimeout(() => {
        this._resolveQueue.reduce((a, b) => b(a), result)
        this._state = 'fulfilled'
      }, 0);
    }
  }

  private onRejected(result: any) {
    if (this._state === 'pending') {
      setTimeout(() => {
        this._rejectQueue.reduce((a, b) => b(a), result)
      }, 0);
      this._state = 'rejected'
    }
  }

  public then (onFulfilled: any, onRejected?: any) {
    console.log('this.state', this._state)
    typeof onFulfilled === 'function' && this._resolveQueue.push(onFulfilled)
    typeof onRejected === 'function' && this._rejectQueue.push(onRejected)
    return this
  }

  static resolve (result: any) {
    return new PromiseTs((resolve) => {
      resolve(result)
    })
  }

  static reject (result: any) {
    return new PromiseTs((resolve) => {
      resolve(result)
    })
  }

  static all (promiseList: PromiseTs[]) {
    let results: any[] = new Array(promiseList.length)
    let count = 0
    return new PromiseTs((resolve, reject) => {
      promiseList.forEach((item, index) => {
        item.then((result: any) => {
          results[index] = result
          count ++
          if (count === promiseList.length) {
            resolve(results)
          }
        })
      }, (error: string) => {
        reject(error)
      })
    })
  }
}

let b = new PromiseTs((resolve, reject) => {
  resolve(JSON.stringify({ a: 1, b: 2, c: 3}))
}).then((result: any) => {
  return JSON.parse(result)
}).then((result: any) => {
  return result
})

let a = new PromiseTs((re) => { re(true) })

a.then((re: any) => {
  console.log('.....', re)
  return 121212
})

let c = new PromiseTs((re) => { setTimeout(() => {
  re(true)
}, 1000); })

PromiseTs.all([a,b, c]).then((result: any) => {
  console.log(result)
})


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
const PENDING = 0
const FULFILLED = 1
const REJECTED = 2

const curry = (fn, args1) => (args2) => fn(args1, args2)
const isFunction = (obj) =>  'function' === typeof obj
const isIterable = (obj) => obj && typeof iterable.length === 'number'
const setImmediate = (func) => setTimeout(func, 0)
const getThen = (value) => {
    var type = typeof value;
    var then;
    if (value && (type === 'object' || type === 'function')) {
        then = value.then;
        if (typeof then === 'function') {
            return then;
        }
    }
    return null;
}

function doResolve (handle, onFulfilled, onRejected) {
  let done = false
  try {
    handle((value) => {
      if (done === true) {
        return
      }
      done = true
      setImmediate(() => onFulfilled(value))
    }, (reason) => {
      if (done === true) {
        return
      }
      done = true
      setImmediate(() => onRejected(reason))
    })
  } catch (error) {
    if (done === true) {
      return
    }
    done = true
    setImmediate(() => onRejected(error))
  }
}

function resolve (promise, value) {
  try {
    const then = getThen(value)
    if (then) {
      doResolve((...args) => then.apply(value, args), curry(resolve, promise), curry(reject, promise))
      return
    }
    fulfill(promise, value)
  } catch (error) {
    reject(promise, error)
  }
}

function fulfill(promise, value) {
  promise.status = FULFILLED
  promise.value = value
  finale(promise)
}

function reject (promise, reason) {
  promise.status = REJECTED
  promise.value = reason
  finale(promise)
}

function finale (promise) {
  if (promise.handlers) {
    promise.handlers.forEach(handler => {
      handle(promise, handler)
    });
    promise.handlers = null
  }
}

function handle (promise, handler) {
  switch (promise.status) {
    case PENDING:
      promise.handlers.push(handler)
      return
    case FULFILLED:
      isFunction(handler.onFulfilled) && handler.onFulfilled(promise.value)
      return
    case REJECTED: 
      isFunction(handler.onRejected) && handler.onRejected(promise.value)
      return
  }
}


class Promise {
  constructor(handler) {
    if (!isFunction(handler))
     throw new TypeError(`Promise resolver ${handler} is not a function`);
    this.value = null
    this.status = PENDING
    this.handlers = []
    doResolve(handler, curry(resolve, this), curry(reject, this))
  }

  then(onFulfilled, onRejected) {
    let res = null;
    const nextPromise = new Promise((resolve, reject) => {
      const _onFulfilled = (value) => {
        if (isFunction(onFulfilled)) {
          try {
            res = onFulfilled(value);
            if (res === nextPromise) {
              return reject(new TypeError('The `promise` and `x` refer to the same object.'));
            }
            return resolve(res);
          } catch (e) {
              return reject(e);
          }
        } else {
          return resolve(value)
        }
      }
      
      const _onRejected = (reason) => {
        if (isFunction(onRejected)) {
          try {
            res = onRejected(reason)
            if (res === nextPromise) {
              return reject(new TypeError('The `promise` and `x` refer to the same object.'));
            }
            return resolve(res)
          } catch (error) {
            return reject(error)
          }
        } else {
          return reject(reason);
        }
      }
      // handle(this, {onFulfilled: _onFulfilled, onRejected: _onRejected})
      setImmediate(() => handle(this, {onFulfilled: _onFulfilled, onRejected: _onRejected}))
    })
    return nextPromise
  }

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  delay(ms, val) {
    return this.then((ori) => Promise.delay(ms, val || ori))
  }

  finally(f) {
    return this.then(
      (value) => Promise.resolve(f()).then(()=>value), 
      (reason)=>Promise.reject(f()).then(()=>{throw reason}))
  }

  static all(promises){
    if (!isIterable(promises)) {
      throw new TypeError('ArgumentsError: argument should be iterable.')
    }
    const len = promises.length
    return len === 0 ? Promise.resolve([]) : new Promise(function(resolve, reject) {
      const results = new Array(len)
      let resolved = 0

      for (let i = 0; i < len; i++) {
        (function(i) {
          promise = promises[i]
          if (!(promise instanceof Promise)) {
            promise = Promise.resolve(promise)
          }
          promise.catch(function(reason) {
            reject(reason)
          });
          promise.then(function(value) {
            results[i] = value
            if (++resolved === len) {
              resolve(results)
            }
          })
        })(i)
      }
    })
}

  static race(promises) {
    if (!isIterable(promises)) {
      throw new TypeError('ArgumentsError: argument should be iterable.')
    }
    const deferred = Promise.deferred()
    const len = promises.length
    for (let i = 0; i < len; i++) {
      promise = promises[i];
      if (promise instanceof Promise) {
        promise.then(function(value) {
          deferred.resolve(value);
        }, function(reason) {
          deferred.reject(reason);
        });
      } else {
        // if not promise, immediately resolve result promise
        deferred.resolve(promise);
        break;
      }
    }
    return deferred.promise
  }

  static deferred() {
    const deferred = {}
    deferred.promise = new Promise((resolve,reject) => {
      deferred.resolve = resolve
      deferred.reject = reject
    });
    return deferred
  }


  static resolve(data) {
    return new Promise((resolve) => resolve(data))
  }


  static reject(reason) {
    return new Promise((resolve, reject) => reject(reason))
  }

  static delay(ms, ...args){
    return new Promise((resolve, reject) => setTimeout(() => resolve(...args), ms))
  }

}

module.exports = Promise

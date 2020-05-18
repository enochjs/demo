const isFunction = (obj: any) =>  'function' === typeof obj
const isIterable = (obj: any) => obj != null && typeof obj[Symbol.iterator] === 'function'
const setImmediate1 = (func: any) => setTimeout(func, 0)


const getThen = (value: any) => {
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

class MyPromise {

  private _status: 'pending' | 'fulfilled' | 'rejected'
  private _value: any
  private _handles: any

  constructor(handler: any) {
    if (!isFunction(handler)) {
      throw new TypeError(`Promise resolver ${handler} is not a function`);
    }
    this._status = 'pending'
    this._handles = []
    this._doResolve(handler)
  }

  private _doResolve(fn: any) {
    var done = false;
    try {
      fn((value: any) => {
        if (done) {
          return;
        }
        done = true;
        setImmediate(() => this._resolve(value))
      }, (reason: any) => {
        if (done) {
          return;
        }
        done = true;
        setImmediate(() => this._reject(reason))
      });
    } catch (e) {
      if (done) {
        return;
      }
      done = true;
      setImmediate(() => this._reject(e))
    }
  }

  private _resolve = (result: any) => {
    try {
      const then = getThen(result)
      if (then) {
        then((resultthen: any) => {
          this._resolve(resultthen)
        })
        return
      }
      this._fulfill(result)
    } catch (error) {
      this._reject(error)
    }
  }

  private _fulfill = (result: any) => {
    this._status = 'fulfilled'
    this._value = result
    this._finale()
  }

  private _reject = (reason: any) => {
    this._status = 'rejected'
    this._value = reason
    this._finale()
  }

  private _finale = () => {
    if (this._handles !== null) {
      this._handles.forEach((handle: any) => {
        this._handle(handle)
      })
      this._handles = null
    }
  }

  public then = (onFulfilled: any, onRejected: any) => {
    const nextPromise = new MyPromise((resolve: any, reject: any) => {
      const _onFulfilled = (result: any) => {
        if (isFunction(onFulfilled)) {
          try {
              const res = onFulfilled(result);
              if (res === nextPromise) {
                return reject(new TypeError('The `promise` and `x` refer to the same object.'));
              }
              return resolve(res);
          } catch (e) {
              return reject(e);
          }
        } else {
            return resolve(result);
        }
      }

      const _onRejected = (error: any) => {
        if (isFunction(onRejected)) {
          try {
            const res = onRejected(error);
            if (res === nextPromise) {
              return reject(new TypeError('The `promise` and `x` refer to the same object.'));
            }
            return resolve(res);
          } catch (e) {
            return reject(e);
          }
        } else {
          return reject(error);
        }
      }
      setImmediate1(() => {
        this._handle({
          onFulfilled: _onFulfilled,
          onRejected: _onRejected,
        })
      })
    })
    return nextPromise
  }

  private _handle = (handler: any) => {
    switch (this._status) {
      case 'pending':
        this._handles.push(handler)
        return
      case 'fulfilled':
        isFunction(handler.onFulfilled) && handler.onFulfilled(this._value)
        return
      case 'rejected':
        isFunction(handler.onRejected) && handler.onRejected(this._value)
        return
    }
  }


  static resolve(data: any) {
    return new MyPromise((resolve: any) => resolve(data))
  }

  static reject(reason: any) {
    return new MyPromise((resolve: any, reject: any) => reject(reason))
  }

  static delay(ms: number, ...args: any[]){
      return new MyPromise((resolve: any, reject: any) => setTimeout(() => resolve(...args), ms))
  }

  static all(promises: any[]) {
    if (promises.length) {
      return new MyPromise((resolve: any, reject: any) => {
        const len = promises.length
        const results = new Array(len)
        let resolved = 0
        for (let i=0; i<len; i++) {
          (function(i) {
            let promise = promises[i]
            if (!(promise instanceof MyPromise)) {
              promise = Promise.resolve(promise)
            }
            promise.catch(function(reason: any) {
                reject(reason)
            });
            promise.then(function(value: any) {
              results[i] = value
              if (++resolved === len) {
                  resolve(results)
              }
            })
          })(i)
        }
      })
    } else {
      return MyPromise.resolve([])
    }
  }
  static race(promises: any[]) {
    if (!isIterable(promises)) {
        throw new TypeError('ArgumentsError: argument should be iterable.')
    }
    const deferred = MyPromise.deferred()
    const len = promises.length
    for (let i = 0; i < len; i++) {
      const promise = promises[i];
      if (promise instanceof MyPromise) {
        promise.then(function(value: any) {
          deferred.resolve(value);
        }, function(reason: any) {
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
    const deferred: any = {}
    deferred.promise = new MyPromise((resolve: any, reject: any) => {
      deferred.resolve = resolve
      deferred.reject = reject
    });
    return deferred
  }

  public catch(onRejected: any) {
    return this.then(undefined, onRejected)
  }

}


module.exports = MyPromise

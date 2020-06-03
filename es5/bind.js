Function.prototype.myBind = function(target) {
  const self = this
  return function (...args) {
    self.apply(target, args)
  }
}

function A() {
  console.log(this)
}

A.myBind({test: 111})()


Function.prototype.myCall = function(context, ...args) {
  var context = context || window
  context.fn = this
  const result = context.fn(...args)
  delete context.fn
  return result
}


Function.prototype.myApply = function(context, args) {
  var context = context || window
  context.fn = this
  const result = context.fn(args)
  delete context.fn
  return result
}


// A.myCall({test: 222})
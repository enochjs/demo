// todo


function logfn (target, key, descriptor) {
  const method = descriptor.value
    return {
      value: function(...args) {
        console.log('...fn log start')
        const result = method.apply(target, args)
        console.log('...fn log end', result)
        return result
      }
    }
  }
// 防抖

function debounce(time) {
  return function (target, key, descriptor) {
    const method = descriptor.value
    let timeout = null
    return {
      value: function(...args) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          method.apply(target, args)
        }, time) 
      }
    }
  }
}

function throttle(time) {
  return function (target, key, descriptor) {
    const method = descriptor.value
    let timeout = null
    return {
      value: function(...args) {
        if (timeout) return;
        timeout = setTimeout(() => {
          method.apply(target, args)
          timeout = null
        }, time) 
      }
    }
  }
}


@logClass
class foo {

  @logfn
  public foo(@logParameter param: string) : string {
    console.log('...param', param)
    return param;
  }
  public foobar(foo: string, @logParameter param: string) : string {
  return param;
  }
}

// param decorator
function logParameter(target: any, methodName : string, index : number) {
  var metadataKey = `log_${methodName}_parameters`;
  if (Array.isArray(target[metadataKey])) {
  target[metadataKey].push(index);
  }
  else {  
    target[metadataKey] = [index];
  }
}


// function decorator
function logfn (target, key, descriptor) {
const method = descriptor.value
return {
value: function(...args) {
console.log('...fn log start')
const result = method.apply(target, args)
console.log('...fn log end', result)
return result
}
}
}

// class decorator
function logClass (target) {
Object.getOwnPropertyNames(target.prototype).forEach(key => {
const func = target.prototype[key]
target.prototype[key] = async (...args) => {
console.log('....class log start')
const result = await func.apply(target, args)
console.log('....class log end', result)
}
})
}

const foo1 = new foo()
foo1.foo('1111')

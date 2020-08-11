const getFib = (number) => {
    if (number <= 2) {
      return 1;
    } else {
      return getFib(number - 1) + getFib(number - 2);
    }
  }

const getCacheProxy = (fn, cache = new Map()) => {
    return new Proxy(fn, {
      apply(target, context, args) {
        
        const argsString = args.join(' ');
        if (cache.has(argsString)) {
          return cache.get(argsString);
        }
        const result = fn(...args);
        cache.set(argsString, result);
  
        return result;
      }
    })
}
const getFibProxy = getCacheProxy(getFib);



const start = + new Date()


// console.log()
// getFibProxy(40);
console.log(getFibProxy(40))
const fibend = + new Date()
console.log(fibend - start)
getFib(40)
console.log(+ new Date() - fibend)
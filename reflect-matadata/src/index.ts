import 'reflect-metadata'

const metadataKey = Symbol('metaDataKey')

class A {
  public test () {
  }
}

Reflect.defineMetadata(metadataKey, { test: 1 }, A.prototype, 'test')

const b = new A()

let aResult = Reflect.getMetadata(metadataKey, b, "test");
console.log('.......',  aResult)

function ProxyClassMethod(classInstance) {
  const handler = {
    apply: function(target, thisArg, argumentsList) {
      console.log(`Calculate sum: ${argumentsList}`);
      // expected output: "Calculate sum: 1,2"
  
      return target(argumentsList[0], argumentsList[1]) * 10;
    }
  };
  Object.getOwnPropertyNames(Object.getPrototypeOf(classInstance)).
  filter(name => name !== 'constructor' && !name.startsWith('_')).forEach(methodName => {
    classInstance[methodName] = new Proxy(classInstance[methodName], handler)
  })

}

ProxyClassMethod(b)

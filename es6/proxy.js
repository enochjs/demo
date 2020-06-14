// todo

// proxy 类似于对对象的浅copy

// proxy 可以 代理function， 可以打日志、改变参数等...
function test(name) {
  console.log('....', name)
}

let proxyFunction = new Proxy(test, {
  apply: function(target, thisArg, argumentsList) {
    console.log(`Calculate sum: ${argumentsList}`);
    // expected output: "Calculate sum: 1,2"
    let args = argumentsList.map(item => `test: ${item}`)
    return target.apply(thisArg, args)
  }
})

// proxyFunction('encohjs')

// proxy class public function
function proxyService(service) {
  let handler = {
      apply: function(target, thisArgument, argumentsList) {
          let args = transform(argumentsList)
          return target.apply(thisArgument, args)
      }
  }
  Object.getOwnPropertyNames(Object.getPrototypeOf(service)).filter(name => name !== 'constructor' && !name.startsWith('_')).forEach(methodName => {
      service[methodName] = new Proxy(service[methodName], handler)
  })
  return service
}


// proxy 可以对原对象，可以做校验、

let target = {
  getItem: function(key) {
    return this[key]
  },
  setItem: function(key, value) {
    return this[key] = value
  }
}


var docCookies = new Proxy(target, {
  "get": function (oTarget, sKey) {
    console.log('....', oTarget)
    return oTarget[sKey] || oTarget.getItem(sKey) || undefined;
  },
  "set": function (oTarget, sKey, vValue) {
    if (sKey in oTarget) { return false; }
    return oTarget.setItem(sKey, vValue);
  },
  "deleteProperty": function (oTarget, sKey) {
    if (sKey in oTarget) { return false; }
    return oTarget.removeItem(sKey);
  },
  "enumerate": function (oTarget, sKey) {
    return oTarget.keys();
  },
  "ownKeys": function (oTarget, sKey) {
    return oTarget.keys();
  },
  "has": function (oTarget, sKey) {
    return sKey in oTarget || oTarget.hasItem(sKey);
  },
  "defineProperty": function (oTarget, sKey, oDesc) {
    if (oDesc && "value" in oDesc) { oTarget.setItem(sKey, oDesc.value); }
    return oTarget;
  },
  "getOwnPropertyDescriptor": function (oTarget, sKey) {
    var vValue = oTarget.getItem(sKey);
    return vValue ? {
      "value": vValue,
      "writable": true,
      "enumerable": true,
      "configurable": false
    } : undefined;
  },
});

/* Cookies 测试 */

console.log(docCookies.my_cookie1 = "First value");
console.log(docCookies.getItem("my_cookie1"));

docCookies.setItem("my_cookie1", "Changed value");
console.log(docCookies.my_cookie1);



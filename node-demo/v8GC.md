
```javascript
var theThing = null;
var replaceThing = function () {
  var originalThing = theThing;
  // Define a closure that references originalThing but doesn't ever actually
  // get called. But because this closure exists, originalThing will be in the
  // lexical environment for all closures defined in replaceThing, instead of
  // being optimized out of it. If you remove this function, there is no leak.
  var unused = function () {
    if (originalThing)
      console.log("hi");
  };
  theThing = {
    longStr: new Array(1000000).join('*'),
    // While originalThing is theoretically accessible by this function, it
    // obviously doesn't use it. But because originalThing is part of the
    // lexical environment, someMethod will hold a reference to originalThing,
    // and so even though we are replacing theThing with something that has no
    // effective way to reference the old value of theThing, the old value
    // will never get cleaned up!
    // 同一个作用域下的 fuction 的作用域是共享的，所以这里someMethod 里面持有了originalThing，所以造成了循环引用
    // newthing.someMethod => oldThing  oldThing.someMethod => ooldting ooldting.someMethod => ooolding ....
    // 引用会一直存在，永远得不到释放
    someMethod: function () {}
  };
  // originalThing = null
  // If you add `originalThing = null` here, there is no leak.
};
setInterval(replaceThing, 1000);
```


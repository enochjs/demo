// deepClone todo
// 思考： deepClone的目的，为了避免 新对象的改变触发老对象的改变
// 思考：什么情况下，改了新的对象，老得对象也会被改掉
// 答：说明两个指针只像同一个对象，并且改的是对象的属性
// （ps: 如果改的是对象的指，老的指针指向的还是老的值，新的指向新的值，不会影响到老的， 只能是指针指向了同一个对象，并且改了对象里面的属性, 
//  这一点很重要，意味着我copy一个对象的时候，如果他的值不是一个更深入的键值对，我只有返回当前值就好了
//  如：
//  var a = { name: 111, setName: fuction() {} }
//  var b = { name: a.name, setName: b.setName }
//  b.setName = 12345
//  console.log(a.setName) ===> function () {}
//  所以我在copy一个对象的时候，只要新建一个object, 非复杂对象 只要 复制键值对就好了
/*   ┌──────────────────────────────────────────────────────────────────────────┐
 *   │var a = { name: 111, setName: function(){} }                              │
 *   │var b = a                                                                 │
 *   │var c = { name: a.name, setName: a.setName }                              │
 *   └──────────────────────────────────────────────────────────────────────────┘
 *   ┌───────────┐             ┌────────────────────────────────────────────────┐
 *   │   stack   │             │                      heap                      │
 *   └───────────┘             └────────────────────────────────────────────────┘
 *   ┌───────────┐             ┌────────────────────────────────────────────────┐
 *   │           │             │┌───────────────┐                               │
 *   │           │             ││     stack     │                               │
 *   │           │             │└───────────────┘                               │
 *   │           │             │┌───────────────┐                               │
 *   │┌─────────┐│             ││ ┌────────────┐│                               │
 *   ││ a: addr ┼┼─────────────┼▶ │ name: 111  ││         ┌──────────────────┐  │
 *   │└─────────┘│             ││ └────────────┘│         │                  │  │
 *   │           │             ││ ┌───────────┐ │         │                  │  │
 *   │┌─────────┐│             ││ │ setName:  │ │         │  function () {}  │  │
 *   ││ b: addr ├┼─────────────┼▶ │   addr    ├─┼─────────▶                  │  │
 *   │└─────────┘│             ││ └───────────┘ │         │                  │  │
 *   │           │             │└───────────────┘         └──────────────────┘  │
 *   │           │             │┌───────────────┐                   ▲           │
 *   │┌─────────┐│             ││ ┌───────────┐ │                   │           │
 *   ││ c: addr ┼┼─────────────┼▶ │ name: 111 │ │                   │           │
 *   │└─────────┘│             ││ └───────────┘ │                   │           │
 *   │           │             ││ ┌───────────┐ │                   │           │
 *   │           │             ││ │ setName:  │ │                   │           │
 *   │           │             ││ │   addr    │─┼───────────────────┘           │
 *   │           │             ││ └───────────┘ │                               │
 *   │           │             │└───────────────┘                               │
 *   └───────────┘             └────────────────────────────────────────────────┘
 */                                                                                                                                       
// 基于以上，拆分任务
// 1、基础类型 string number boolean undefinded null symbol 直接返回，保存在stack里面的
// 2、object                                       
// 内存角度
// 基本类型属于栈内存（名义上），直接返回就会创建新的
// 引用类型：直接返回是个地址，肯定不行，需要遍历进行继续copy
// js 类型
// 基本类型  string number boolean undefinded null symbol
// 复杂类型 object：
// 特殊对象： array，date, RegExp，function，Map，Set
// 

function isObject(target) {
  return target !== null && typeof target === 'object'
}

function isFunction(target) {
  return typeof target === 'function'
}

function getTag(value) {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]'
  }
  return toString.call(value)
}

const dateTag = '[object Date]'
const mapTag = '[object Map]'
const objectTag = '[object Object]'
const arrayTag = '[object Array]'
const setTag = '[object Set]'

function specialDeal (target, tag) {
  const Ctor = target.constructor
  switch (tag) {
    case dateTag: return new Ctor(target)
    default: return target
  }
}

function deepClone(target) {

  if (isFunction(target)) {
    return {}
  }

  if (!isObject(target)) {
    return target
  }
  const tag = getTag(target)
  if (tag === arrayTag) {
    return target.map((item => deepClone(item)))
  } else if (tag === objectTag) {
    const result = Object.create(target)
    Object.keys(target).map((key) => {
      result[key] = isObject(target[key]) ? deepClone(target[key]) : target[key]
    })
    return result
  } else {
    return specialDeal(target, tag)
  }

}

const input = [{
  name: 1111,
  setName: () => {},
  date: new Date(),
  test: [{
    name: 'test',
    setName: () => { console.log(1111) },
    date: new Date('2018-03-23'),
    test2: {
      name: 'test2',
      height: 'number',
      date: new Date('2020-04-23'),
      setName: (name) => { console.log(name) }
    }
  }]
}]

const result = deepClone(input)

console.log('.....setName', result[0].test[0].test2.setName(3232323))
console.log('........', JSON.stringify(result, '\n', 2))
result[0].test[0].test2.setName = 121212
console.log('modify name', input[0].test[0].test2.setName, result[0].test[0].test2.setName)

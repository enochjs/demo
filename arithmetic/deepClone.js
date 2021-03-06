// deepClone todo
// 思考： deepClone的目的，为了避免 新对象的改变触发老对象的改变
// 思考：什么情况下，改了新的对象，老得对象也会被改掉
// 答：说明两个指针只像同一个对象，并且改的是对象的属性
// （ps: 如果改的是对象的指，老的指针指向的还是老的值，新的指向新的值，不会影响到老的， 只能是指针指向了同一个对象，并且改了对象里面的属性, 
//  只要不改变对象的属性就没有问题
//  这一点很重要，意味着我copy一个对象的时候，如果他的值不是一个更深入的键值对，我只要返回当前值就好了，如果是个更深入的对象，那就是一个递归的过程
//  如：
//  var a = { name: 111, setName: fuction() {} }
//  var b = { name: a.name, setName: b.setName }
//  b.setName = 12345
//  console.log(a.setName) ===> function () {}
//  所以我在copy一个对象的时候，只要新建一个object, 非复杂对象 只要 复制键值对就好了
//  根据以上说的：需要特殊处理的对象，就是这个对象有属性的，js中有属性的数据类型有： 
//  array Map Set object[key:value] class, class 和 object [key:value] 的处理是一样的，通过Object.create() 复制 prototype
// 
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
// 特殊对象： array，date, RegExp，function，Map，Set
// 

function getTag(value) {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]'
  }
  return toString.call(value)
}

const mapTag = '[object Map]'
const objectTag = '[object Object]'
const arrayTag = '[object Array]'
const setTag = '[object Set]'
const dateTag = '[object Date]'
const regTag = '[object RegExp]'

function deepClone(target) {
  const tag = getTag(target)
  let result
  switch (tag) {
    case regTag:
      result = new target.constructor(regexp.source, reFlags.exec(regexp))
      result.lastIndex = regexp.lastIndex
      break
    case dateTag:
      result = new target.constructor(target)
      break;
    case arrayTag:
      result = target.map((item) => deepClone(item))
      break;
    case mapTag:
      result = new Map()
      for (let [key, value] of target) {
        result.set(key, deepClone(value))
      }
      break;
    case setTag:
      result = new Set()
      target.forEach(item => {
        result.add(deepClone(item))
      })
      break;
    case objectTag:
      result = Object.create(target)
      Object.keys(target).forEach((key) => {
        result[key] = deepClone(target[key])
      })
    default:
      result = target
      break;
  }
  return result
}

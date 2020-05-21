[阮大神分享](https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
[知乎链接](https://zhuanlan.zhihu.com/p/25303493)

1、flex是什么？
弹性盒模型

### constainer

- flex-direction：
  - row 
  - row-reverse 
  - column 
  - column-reverse
- flex-wrap
  - wrap 
  - no-wrap 
  - wrap-reverse
- flex-flow (flext-direction + flex-wrap)

- justify-content (item 主轴排列方式)
  - flex-start
  - flex-end
  - center
  - space-between
  - space-around
- align-items  (item 交叉轴排列方式， 类似于veritical-align)
  - flex-start
  - flex-end
  - center
  - baseline
  - stretch
- align-content （flex-wrap 有多列时，不同列的 排列方式）
  - flex-start
  - flext-end
  - center
  - space-between
  - space-around
  - stretch

### item
- order: defalut 0
- flex-grow: defalut 0 （total item size < container size, 剩余空间放大比例）
- flex-shrink: defalut 1 (total item size > container size, item 缩小比例）
- flex-basis: default auto (item 基础宽度，默认 max-content大小)
- flex: flex-grow flext-shrink flex-basis
- align-self: default auto （对应 align-items）
  - auto
  - flex-start
  - flex-end
  - center
  - baseline
  - stretch

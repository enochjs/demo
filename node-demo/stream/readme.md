## steam

### 以下纯属个人观点，未必正确

```javascript
/**
 * 一如既往说说存在的目的（毕竟被加入node的核心api肯定是有原因的，了解原因很重要，因为这意味着他的用途）
 * 说说流存在的目的，我认为可能以下几点
 * 大文件占用内存太多
 * 剩下的不知道了，哈哈哈哈
 * 
 * 总之能就是希望能够一边写，一边读啦
 * 
 * 这就要求有哪些功能呢
 * 1、读
 * 2、写
 * 3、暂停（如果写的数据消费不了，就不写了）
 * 4、error处理
 * 5、cloase
 * 
*/
```

https://medium.com/edge-coders/node-js-streams-everything-you-need-to-know-c9141306be93
https://github.com/barretlee/dive-into-node-stream/tree/master/lib

### readable streams events
- data
- end
- error
- close
- readable

### readable streams function
- pipe, unpipe
- readt, unshift, resume
- pause, isPaused
- setEncoding


### writalbe streams events
- drain
- finish
- error
- close
- pipe/unpipe

### writable streams functions
- write
- end
- cork, uncork
- setDefaultEncoding


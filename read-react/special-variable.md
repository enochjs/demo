## 一些特殊的需要理解的变量


### FiberRootNode
```javascript
root.lastExpiredTime // 初始值为 noWork，只有当任务过期时，会被更改为过期时间（markRootExpiredAtTime方法）
root.callbackNode // 用来比对任务有没有执行完的，没有的话，任务不会被取消

```

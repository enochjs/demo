## sheduler

### MessageChannel

```javascript
const channel = new MessageChannel();
const port = channel.port2;
channel.port1.onmessage = performWorkUntilDeadline;

// port.postMessage 代码执行完毕，主线程处于空闲状态，如果需要渲染就会执行渲染， 渲染结束，执行onmessage回调， 如果不需要渲染，执行onmessage回调
```

### task
```javascript
// taskQueue 中 expirationTime 越小优先级越高
// task queue 有两种
// taskQueue 不需要delay的队列，以 expirationTime排序
// timerQueue 需要delay的队列，以 startTime排序， 会在每一次workLoop 时候判断，如果 currentTime >= startTime, 则将 task push到taskQueue中
// 数据结构
{
  id,
  callback, // 执行task时执行的回调，实际上就是 performSyncWorkOnRoot/performConcurrentWorkOnRoot
  priorityLevel,
  startTime, // 任务开始时间
  expirationTime, // 任务结束时间 currentTime + delay + timeout（prioritytimeout）
  sortIndex, // 排序任务队列，高优先级在前，taskQueue: expirationTime， timerQueue: startTime
}

```

## task workLoop
```javascript



```
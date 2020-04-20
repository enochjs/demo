## react-hooks

### structure
```javascript
export type Hook = {|
  memoizedState: any, // updatestate
  baseState: any, // current state
  // 
  // such as  
  /**
   * currentQueue
   * function queueExpample () {
      setState(1)
      setState(2)
    }
    it will has queue  []
  **/
  baseQueue: Update<any, any> | null,  // currentQueue
  // UpdateQueue
  queue: UpdateQueue<any, any> | null,
  next: Hook | null,
|};

```

### hooks-list
```javascript
// any useState useMemo useEffect use... is a hook
// such as 
// const [count, setCount] = useState(0)
// const [name, setName] = useState(0)
// const refDemo = useRef(null)
// 伪代码
// currentFiber.memoizedState = countHook -> nameHooks -> refDemoHook
// each is a hooks, use workInProgressHook
```


### reduder
```javascript
// updateReducer

```
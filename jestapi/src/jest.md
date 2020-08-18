### mock moudules

```javascript
jest.disableAutomock()





jest.enableAutomock()

jest.createMockFromModule(moduleName)

// jest.mock(moduleName, factory, options)
jest.mock(
  '../moduleName',
  () => { },
  {virtual: true},
);

jest.unmock(moduleName)

// 可以不在文件顶部，如放在test里面
// jest.doMock(moduleName, factory, options)
beforeEach(() => {
  jest.resetModules();
});

test('moduleName 1', () => {
  jest.doMock('../moduleName', () => {
    return jest.fn(() => 1);
  });
  const moduleName = require('../moduleName');
  expect(moduleName()).toEqual(1);
});

test('moduleName 2', () => {
  jest.doMock('../moduleName', () => {
    return jest.fn(() => 2);
  });
  const moduleName = require('../moduleName');
  expect(moduleName()).toEqual(2);
});

jest.dontMock(moduleName)

jest.setMock(moduleName, moduleExports)

jest.requireActual(moduleName)

jest.requireMock(moduleName)

jest.resetModules()

jest.isolateModules(fn)

```

### mock functions
```javascript

jest.fn(implementation)

jest.isMockFunction(fn)

jest.spyOn(object, methodName)

jest.spyOn(object, methodName, accessType?)

jest.clearAllMocks()

jest.resetAllMocks()

jest.restoreAllMocks()
```


### Mock timers
```javascript

jest.useFakeTimers(implementation?: 'modern' | 'legacy')

jest.useRealTimers()

jest.runAllTicks()

jest.runAllTimers()

jest.runAllImmediates()

jest.advanceTimersByTime(msToRun)

jest.advanceTimersToNextTimer(steps)

jest.runOnlyPendingTimers()

jest.clearAllTimers()

jest.getTimerCount()

jest.setSystemTime(now?: number | Date)

jest.getRealSystemTime()
```

### misc
```javascript
jest.setTimeout(timeout)

jest.retryTimes()


```
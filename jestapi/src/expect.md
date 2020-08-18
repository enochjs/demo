
### 测试对象 
expect(value)

### matchers

#### 自定义matcher
expect.extend(matchers)

```javascript
expect.extend({
    yourMatcher(x, y, z) {
      return {
        pass: true,
        message: () => '',
      };
    },
});
```

ts 
```typescript
declare global {
    namespace jest {
      interface Matchers<R> {
        toBeWithinRange(a: number, b: number): R;
      }
    }
  }
```

同步
```
expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
});

test('numeric ranges', () => {
  expect(100).toBeWithinRange(90, 110);
  expect(101).not.toBeWithinRange(0, 100);
  expect({apples: 6, bananas: 3}).toEqual({
    apples: expect.toBeWithinRange(1, 10),
    bananas: expect.not.toBeWithinRange(11, 20),
  });
});
```

异步
```javascript
expect.extend({
  async toBeDivisibleByExternalValue(received) {
    const externalValue = await getExternalValueFromRemoteSource();
    const pass = received % externalValue == 0;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be divisible by ${externalValue}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be divisible by ${externalValue}`,
        pass: false,
      };
    }
  },
});

test('is divisible by external value', async () => {
  await expect(100).toBeDivisibleByExternalValue();
  await expect(101).not.toBeDivisibleByExternalValue();
});
```

#### jest提供matcher
##### asserts
``` javascript
// 判断断言执行number次，主要是确保异步callback都被执行到
// jest 默认执行到代码结束就结束了，如果遇到异步 可以用 done 、return promise、async await
// expect.assertions(number)
test('doAsync calls both callbacks', () => {
  expect.assertions(2);
  function callback1(data) {
    expect(data).toBeTruthy();
  }
  function callback2(data) {
    expect(data).toBeTruthy();
  }

  doAsync(callback1, callback2);
});

// 用来确保断言被执行到，主要是确保异步callback都被执行到
// expect.hasAssertions()
test('prepareState prepares a valid state', () => {
  expect.hasAssertions();
  prepareState(state => {
    expect(validateState(state)).toBeTruthy();
  });
  return waitOnState();
});

// .toHaveBeenCalled()
// .toBeCalled()
function drinkAll(callback, flavour) {
  if (flavour !== 'octopus') {
    callback(flavour);
  }
}

describe('drinkAll', () => {
  test('drinks something lemon-flavoured', () => {
    const drink = jest.fn();
    drinkAll(drink, 'lemon');
    expect(drink).toHaveBeenCalled();
  });

  test('does not drink something octopus-flavoured', () => {
    const drink = jest.fn();
    drinkAll(drink, 'octopus');
    expect(drink).not.toHaveBeenCalled();
  });
});

// .toHaveBeenCalledTimes(number)
// .toBeCalledTimes(number)
test('drinkEach drinks each drink', () => {
  const drink = jest.fn();
  drinkEach(drink, ['lemon', 'octopus']);
  expect(drink).toHaveBeenCalledTimes(2);
});

// .toHaveReturned()
// .toReturn()
test('drinks returns', () => {
  const drink = jest.fn(() => true);

  drink();
  expect(drink).toHaveReturned();
});

// .toHaveReturnedTimes(number)
// .toReturnTimes(number)
test('drink returns twice', () => {
  const drink = jest.fn(() => true);
  drink();
  drink();
  expect(drink).toHaveReturnedTimes(2);
});

```

##### type
```javascript
// 匹配任何非null和undefined的值
expect.anything()

test('map calls its argument with a non-null argument', () => {
  const mock = jest.fn();
  [1].map(x => mock(x));
  expect(mock).toBeCalledWith(expect.anything());
});

// 匹配任何给定的constructor
expect.any(constructor)
function randocall(fn) {
  return fn(Math.floor(Math.random() * 6 + 1));
}

test('randocall calls its callback with a number', () => {
  const mock = jest.fn();
  randocall(mock);
  expect(mock).toBeCalledWith(expect.any(Number));
});

// .toBeInstanceOf(Class)
test('toBeInstanceof', () => {
  class A {}
  expect(new A()).toBeInstanceOf(A);
  expect(() => {}).toBeInstanceOf(Function);
  expect(new A()).toBeInstanceOf(Function); // throws
});



// .toBeDefined()
test('there is a new flavor idea', () => {
  expect(fetchNewFlavorIdea()).toBeDefined();
});

// .toBeFalsy()
test('drinking La Croix does not lead to errors', () => {
  drinkSomeLaCroix();
  expect(getErrors()).toBeFalsy();
});

// .toBeNull()
test('bloop returns null', () => {
  expect(bloop()).toBeNull();
});

// .toBeTruthy()
test('drinking La Croix leads to having thirst info', () => {
  drinkSomeLaCroix();
  expect(thirstInfo()).toBeTruthy();
});

// .toBeUndefined()
test('the best drink for octopus flavor is undefined', () => {
  expect(bestDrinkForFlavor('octopus')).toBeUndefined();
});

// .toBeNaN()
test('passes when value is NaN', () => {
  expect(NaN).toBeNaN();
  expect(1).not.toBeNaN();
});

```


##### 比较

``` javascript
.toBe(value)

.toBeCloseTo(number, numDigits?)

.toBeGreaterThan(number | bigint)

.toBeGreaterThanOrEqual(number | bigint)

.toBeLessThan(number | bigint)

.toBeLessThanOrEqual(number | bigint)

.toEqual(value)

.toStrictEqual(value)

.toHaveLength(number)

.toHaveProperty(keyPath, value?)
```

##### arguments
```javascript
.toHaveBeenCalledWith(arg1, arg2, ...)
.toHaveBeenLastCalledWith(arg1, arg2, ...)
.toHaveBeenNthCalledWith(nthCall, arg1, arg2, ....)
```


##### return value
``` javascript
.toHaveReturnedWith(value)
.toHaveLastReturnedWith(value)
.toHaveNthReturnedWith(nthCall, value)
```


##### containing
``` javascript
// arrayContaining
// received array 包含 expected array的所有值
expect.arrayContaining(array)

describe('arrayContaining', () => {
  const received = ['Alice', 'Bob', 'Eve']
  const expected = ['Alice', 'Bob'];
  it('matches even if received contains additional elements', () => {
    expect(received).toEqual(expect.arrayContaining(expected));
  });
  it('does not match if received does not contain expected elements', () => {
    expect(['Bob', 'Eve']).not.toEqual(expect.arrayContaining(expected));
  });
});

// 与expect.arrayContaining(array)相反，
expect.not.arrayContaining(array)

describe('not.arrayContaining', () => {
  const expected = ['Samantha'];

  it('matches if the actual array does not contain the expected elements', () => {
    expect(['Alice', 'Bob', 'Eve']).toEqual(
      expect.not.arrayContaining(expected),
    );
  });
});


expect.objectContaining(object)
// objectContaining
// 同array received object 包含 expected object的所有值
test('onPress gets called with the right thing', () => {
  const onPress = jest.fn();
  function simulatePresses(fn) {
    fn({ x: 100, y: 200, z: 300 })
  }
  simulatePresses(onPress);
  expect(onPress).toBeCalledWith(
    expect.objectContaining({
      x: expect.any(Number),
      y: expect.any(Number),
    }),
  );
});

// 与expect.objectContaining(array)相反，
expect.not.objectContaining(object)

describe('not.objectContaining', () => {
  const expected = {foo: 'bar'};
  it('matches if the actual object does not contain expected key: value pairs', () => {
    expect({bar: 'baz'}).toEqual(expect.not.objectContaining(expected));
  });
});

expect.stringContaining(string)

expect.not.stringContaining(string)

expect.stringMatching(string | regexp)

expect.not.stringMatching(string | regexp)

.toContain(item)

.toContainEqual(item)

.toMatch(regexpOrString)

.toMatchObject(object)

```

##### 方式(关系) received with expected
``` javascript
.not
test('the best flavor is not coconut', () => {
  expect(bestLaCroixFlavor()).not.toBe('coconut');
});

.resolves
test('resolves to lemon', () => {
  return expect(Promise.resolve('lemon')).resolves.toBe('lemon');
});
test('resolves to lemon', async () => {
  await expect(Promise.resolve('lemon')).resolves.toBe('lemon');
  await expect(Promise.resolve('lemon')).resolves.not.toBe('octopus');
});

.rejects
test('rejects to octopus', () => {
  return expect(Promise.reject(new Error('octopus'))).rejects.toThrow('octopus');
});

test('rejects to octopus', async () => {
  await expect(Promise.reject(new Error('octopus'))).rejects.toThrow('octopus');
});

.toThrow(error?)

test('throws on octopus', () => {
  expect(() => {
    drinkFlavor('octopus');
  }).toThrow();
});

```


##### snapshot
``` javascript
expect.addSnapshotSerializer(serializer)


.toMatchSnapshot(propertyMatchers?, hint?)
.toMatchInlineSnapshot(propertyMatchers?, inlineSnapshot)
.toThrowErrorMatchingSnapshot(hint?)
.toThrowErrorMatchingInlineSnapshot(inlineSnapshot)

```

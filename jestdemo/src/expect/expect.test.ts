import 'jasmine-expect';
// import * as test from './index'


declare global {
  namespace jest {
    interface Matchers<R> {
      toBeWithinRange(a: number, b: number): R;
      toBeDivisibleByExternalValue(received?: number): R;
    }
  }
}

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

// expect.extend({
//   async toBeDivisibleByExternalValue(received) {
//     const externalValue = await getExternalValueFromRemoteSource();
//     const pass = received % externalValue == 0;
//     if (pass) {
//       return {
//         message: () =>
//           `expected ${received} not to be divisible by ${externalValue}`,
//         pass: true,
//       };
//     } else {
//       return {
//         message: () =>
//           `expected ${received} to be divisible by ${externalValue}`,
//         pass: false,
//       };
//     }
//   },
// });

// test('is divisible by external value', async () => {
//   await expect(100).toBeDivisibleByExternalValue();
//   await expect(101).not.toBeDivisibleByExternalValue();
// });

test('map calls its argument with a non-null argument', () => {
  const mock = jest.fn();
  [1].map(x => mock(x));
  expect(mock).toBeCalledWith(expect.anything());
});

function randocall(fn: (n: number) => any) {
  return fn(Math.floor(Math.random() * 6 + 1));
}

test('randocall calls its callback with a number', () => {
  const mock = jest.fn();
  randocall(mock);
  // expect.
  expect(mock).toBeCalledWith(expect.any(Number));
});

describe('arrayContaining', () => {
  const expected = ['Alice', 'Bob'];
  it('matches even if received contains additional elements', () => {
    // console.log('....', expect.arrayContaining(expected))
    expect(['Alice', 'Bob', 'Eve']).toEqual(expect.arrayContaining(expected));
  });
  it('does not match if received does not contain expected elements', () => {
    expect(['Bob', 'Eve']).not.toEqual(expect.arrayContaining(expected));
  });
});

describe('Beware of a misunderstanding! A sequence of dice rolls', () => {
  const expected = [1, 2, 3, 4, 5, 6];
  it('matches even with an unexpected number 7', () => {
    expect([4, 1, 6, 7, 3, 5, 2, 5, 4, 6]).toEqual(
      expect.arrayContaining(expected),
    );
  });
  it('does not match without an expected number 2', () => {
    expect([4, 1, 6, 7, 3, 5, 7, 5, 4, 6]).not.toEqual(
      expect.arrayContaining(expected),
    );
  });
});

test('doAsync calls both callbacks', () => {
  expect.assertions(2);
  function callback1(data: any) {
    expect(data).toBeTruthy();
  }
  function callback2(data: any) {
    expect(data).toBeTruthy();
  }

  callback1(1);
  callback2(2);
});


describe('not.arrayContaining', () => {
  const expected = ['Samantha'];

  it('matches if the actual array does not contain the expected elements', () => {
    expect(['Alice', 'Bob', 'Eve']).toEqual(
      expect.not.arrayContaining(expected),
    );
  });
});
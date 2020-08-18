jest.useFakeTimers()

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

test('doAsync calls both callbacks', () => {
  expect.assertions(2);
  function callback1(data) {
    expect(data).toBeTruthy();
  }
  function callback2(data) {
    expect(data).toBeTruthy();
  }

  // setTimeout(() => {
  //   callback1(1)
  //   callback2(2)
  // }, 1000)

  return new Promise((resolve) => {
    callback1(1)
    callback2(2)
    resolve(true)
  })

  // jest.advanceTimersByTime(1000);
});

describe('not.arrayContaining', () => {
  const expected = ['Samantha', 'Bob'];

  it('matches if the actual array does not contain the expected elements', () => {
    expect(['Alice', 'Bob', 'Eve']).toEqual(
      expect.not.arrayContaining(expected),
    );
  });
});

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

describe('not.objectContaining', () => {
  const expected = {foo: 'bar'};
  it('matches if the actual object does not contain expected key: value pairs', () => {
    expect({bar: 'baz'}).toEqual(expect.not.objectContaining(expected));
  });
});

const houseForSale = {
  bath: true,
  bedrooms: 4,
  kitchen: {
    amenities: ['oven', 'stove', 'washer'],
    area: 20,
    wallColor: 'white',
    'nice.oven': true,
  },
  'ceiling.height': 2,
};

test('this house has my desired features', () => {
  // Example Referencing
  expect(houseForSale).toHaveProperty('bath');
  expect(houseForSale).toHaveProperty('bedrooms', 4);

  expect(houseForSale).not.toHaveProperty('pool');

  // Deep referencing using dot notation
  expect(houseForSale).toHaveProperty('kitchen.area', 20);
  expect(houseForSale).toHaveProperty('kitchen.amenities', [
    'oven',
    'stove',
    'washer',
  ]);

  expect(houseForSale).not.toHaveProperty('kitchen.open');

  // Deep referencing using an array containing the keyPath
  expect(houseForSale).toHaveProperty(['kitchen', 'area'], 20);
  expect(houseForSale).toHaveProperty(
    ['kitchen', 'amenities'],
    ['oven', 'stove', 'washer'],
  );
  expect(houseForSale).toHaveProperty(['kitchen', 'amenities', 0], 'oven');
  expect(houseForSale).toHaveProperty(['kitchen', 'nice.oven']);
  expect(houseForSale).not.toHaveProperty(['kitchen', 'open']);

  // Referencing keys with dot in the key itself
  expect(houseForSale).toHaveProperty(['ceiling.height'], 2);
});


// const utils = require('./utils')
// jest.disableAutomock();
// test('original implementation', () => {
//   // now we have the original implementation,
//   // even if we set the automocking in a jest configuration
//   expect(utils.authorize()).toBe('token');
// });

// jest.enableAutomock();
// test('original implementation', () => {
//   // now we have the mocked implementation,
//   expect(utils.authorize._isMockFunction).toBeTruthy();
//   expect(utils.isAuthorized._isMockFunction).toBeTruthy();
// });

const utils = jest.createMockFromModule('./utils');
utils.isAuthorized = jest.fn(secret => secret === 'not wizard');

test('implementation created by jest.createMockFromModule', () => {
  expect(utils.authorize.mock).toBeTruthy();
  expect(utils.isAuthorized('not wizard')).toEqual(true);
});

const example = jest.createMockFromModule('./example');

test('should run example code', () => {
  // creates a new mocked function with no formal arguments.
  expect(example.function.name).toEqual('square');
  expect(example.function.length).toEqual(0);

  // async functions get the same treatment as standard synchronous functions.
  expect(example.asyncFunction.name).toEqual('asyncSquare');
  expect(example.asyncFunction.length).toEqual(0);

  // creates a new class with the same interface, member functions and properties are mocked.
  expect(example.class.constructor.name).toEqual('Bar');
  expect(example.class.foo.name).toEqual('foo');
  expect(example.class.array.length).toEqual(0);

  // creates a deeply cloned version of the original object.
  expect(example.object).toEqual({
    baz: 'foo',
    bar: {
      fiz: 1,
      buzz: [],
    },
  });

  // creates a new empty array, ignoring the original array.
  expect(example.array.length).toEqual(0);

  // creates a new property with the same primitive value as the original property.
  expect(example.number).toEqual(123);
  expect(example.string).toEqual('baz');
  expect(example.boolean).toEqual(true);
  expect(example.symbol).toEqual(Symbol.for('a.b.c'));
});


import axios from 'axios'
import { sum, forEach, Users } from './api'


describe('sum', () => {

  test('two plus two is four', () => {
    expect(sum(2, 2)).toBe(4);
  });

  test('null', () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
  });

  test('zero', () => {
    const z = 0;
    expect(z).not.toBeNull();
    expect(z).toBeDefined();
    expect(z).not.toBeUndefined();
    expect(z).not.toBeTruthy();
    expect(z).toBeFalsy();
  });

})



describe('forEach', () => {
  test('forEach mock', () => {
    const mockCallback = jest.fn(x => 42 + x);
    forEach([0, 1], mockCallback);

    // 此 mock 函数被调用了两次
    expect(mockCallback.mock.calls.length).toBe(2);

    // 第一次调用函数时的第一个参数是 0
    expect(mockCallback.mock.calls[0][0]).toBe(0);

    // 第二次调用函数时的第一个参数是 1
    expect(mockCallback.mock.calls[1][0]).toBe(1);

    // 第一次函数调用的返回值是 42
    expect(mockCallback.mock.results[0].value).toBe(42);
  })
})

jest.mock('axios');

// users.js
describe('Users', () => {
  test('axios api', async () => {
    const fakerUser = {
      name: 'enochjs',
      age: '29',
      address: 'test address',
    }
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.get.mockReturnValue(Promise.resolve({ data: fakerUser }));
    const result = await Users.all()
    expect(mockedAxios.get).toHaveBeenCalled();
    expect(result).toBe(fakerUser);
  })

  test('fetch api', async () => {
    const fakerUser = {
      name: 'enochjs',
      age: '29',
      address: 'test address',
    }

    jest.spyOn(global, 'fetch').mockImplementation(() => {
      return Promise.resolve({
          json: () => Promise.resolve(fakerUser)
      }) as any
    })

    const result = await Users.fetchAll()
    expect(result).toEqual(fakerUser)
  })
})
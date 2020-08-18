jest.mock('./request');

import * as user from './user';

// The assertion for a promise must be returned.
it('works with promises', () => {
  expect.assertions(1);
  return user.getUserName(4).then(data => expect(data).toEqual('Mark'));
});

// Testing for async errors using Promise.catch.
it('tests error with promises', () => {
    expect.assertions(1);
    return user.getUserName(2).catch(e =>
      expect(e).toEqual({
        error: 'User with 2 not found.',
      }),
    );
  });
  
  // Or using async/await.
  it('tests error with async/await', async () => {
    expect.assertions(1);
    try {
      await user.getUserName(1);
    } catch (e) {
      expect(e).toEqual({
        error: 'User with 1 not found.',
      });
    }
  });

  // Testing for async errors using `.rejects`.
it('tests error with rejects', () => {
    expect.assertions(1);
    return expect(user.getUserName(3)).rejects.toEqual({
      error: 'User with 3 not found.',
    });
  });
  
  // Or using async/await with `.rejects`.
  it('tests error with async/await and rejects', async () => {
    expect.assertions(1);
    await expect(user.getUserName(3)).rejects.toEqual({
      error: 'User with 3 not found.',
    });
  });
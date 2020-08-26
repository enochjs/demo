// import 

// jest.mock('./request');

const utils = jest.createMockFromModule('./utils').default;
utils.isAuthorized = jest.fn(secret => secret === 'not wizard');

test('implementation created by jest.createMockFromModule', () => {
  expect(utils.authorize.mock).toBeTruthy();
  expect(utils.authorize()).toBe('token');
  expect(utils.isAuthorized('not wizard')).toEqual(true);
});
// utils.js
export default {
  authorize: () => {
    return 'token';
  },
  isAuthorized: (secret: string) => secret === 'wizard',
};
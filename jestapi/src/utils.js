const utils = {
  authorize: () => {
    return 'token';
  },
  isAuthorized: secret => secret === 'wizard',
};

module.exports = utils
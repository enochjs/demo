const Promise = require('./dist/index')


module.exports = {
    resolved: function(value) {
        return Promise.resolve(value);
    },
    rejected: function(reason) {
        return Promise.reject(reason);
    },
    deferred: Promise.deferred
};

// console.log('....dddddd.', Promise.deferred())
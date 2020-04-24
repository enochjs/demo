const PromiseTs = require('./index.js')

console.log('......', PromiseTs)

module.exports = {
    resolved: function(value) {
        return PromiseTs.resolve(value);
    },
    rejected: function(reason) {
        return PromiseTs.reject(reason);
    },
    deferred: PromiseTs.deferred
};
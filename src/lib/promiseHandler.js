

var q = require('q');

function resolve(deferred) {
    return function () {
        deferred.resolve();
        return deferred.promise;
    };
}

function reject(defer, elementName) {
    return function (error) {
        console.log('reject error: ', error, 'elementName: ', elementName);
        defer.reject(error);
        throw error;
    };
}

module.exports = {
    resolve: resolve,
    reject: reject
};

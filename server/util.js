const request = require('request');

function escapeRegex(regex) {
    return regex.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
}

function httpRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
        request(url, options, (err, res, body) => {
            if(err) {
                err.statusCode = res.statusCode;
                return reject(err);
            }

            if(res.statusCode !== 200) {
                let err = new Error('Request failed');
                err.statusCode = res.statusCode;

                return reject(err);
            }

            resolve(body);
        });
    });
}

function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch((error) => {
            return next(error);
        });
    };
}

function detectBinary(state, path = '', results = []) {
    const allowedTypes = ['Array', 'Boolean', 'Date', 'Number', 'Object', 'String'];

    if(!state) {
        return results;
    }

    let type = state.constructor.name;

    if(!allowedTypes.includes(type)) {
        results.push({ path: path, type: type });
    }

    if(type === 'Object') {
        for(let key in state) {
            detectBinary(state[key], `${path}.${key}`, results);
        }
    } else if(type === 'Array') {
        for(let i = 0; i < state.length; ++i) {
            detectBinary(state[i], `${path}[${i}]`, results);
        }
    }

    return results;
}

module.exports = {
    detectBinary: detectBinary,
    escapeRegex: escapeRegex,
    httpRequest: httpRequest,
    wrapAsync: wrapAsync
};

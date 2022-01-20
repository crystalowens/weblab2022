const util = require('util');

function logObject(obj){
    console.log(util.inspect(obj, {depth: 2}));
}

module.exports = {
    logObject : logObject
};
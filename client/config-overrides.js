const path = require('path');
module.exports = function (override, env) {
    if (!override.resolve) {
        override.resolve = {};
    }
    if (!override.resolve.alias) {
        override.resolve.alias = {};
    }
    Object.assign(override.resolve.alias, {
        "@components": path.resolve(__dirname, 'src/components')
    })
    return override
};
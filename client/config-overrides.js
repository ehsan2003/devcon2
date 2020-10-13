const path = require('path');
const {override} = require('customize-cra')
const {addReactRefresh}= require('customize-cra-react-refresh')

module.exports = override(function (override, env) {
    if (!override.resolve) {
        override.resolve = {};
    }
    if (!override.resolve.alias) {
        override.resolve.alias = {};
    }

    override.devtool='cheap-module-eval-source-map'

    Object.assign(override.resolve.alias, {
        "@components": path.resolve(__dirname, 'src/components'),
        "@reducers": path.resolve(__dirname, 'src/reducers'),
        "@actions": path.resolve(__dirname, 'src/actions'),
        "@epics": path.resolve(__dirname, 'src/epics'),
        "@shared": path.resolve(__dirname, 'src/shared'),
        "@conf": path.resolve(__dirname, 'src/conf')

    })
    return (override)
},addReactRefresh());
const path = require('path');

module.exports.srcPath = path.resolve(__dirname, '../src');
module.exports.modulesPath = path.resolve(__dirname, '../node_modules');
module.exports.publicPath = path.resolve(__dirname, '../public');
module.exports.buildPath = path.join(__dirname, '../build');

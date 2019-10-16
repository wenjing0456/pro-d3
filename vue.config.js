const path = require('path');
const resolve = dir => path.join(__dirname, dir);
module.exports = {
    // options...
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
    },
}
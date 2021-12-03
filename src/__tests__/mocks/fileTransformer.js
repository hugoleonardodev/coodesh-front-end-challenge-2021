/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
const path = require('path')

module.exports = {
    process(_source, filename, _config, _options) {
        return 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';'
    },
}

const logger = require('tracer').console()

const util = require('util')
const exec = util.promisify(require('child_process').exec)

module.exports = {
    logger,
    exec
}
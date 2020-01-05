const fs = require('fs-extra')
const path = require('path')
const { gitClone } = require('./cmd/git')
const { hexoBuild } = require('./cmd/hexo')
const { logger } = require('./util')

const {
    BLOG_GIT,
    BLOG_FOLDER,
    POST_GIT,
    POST_FOLDER,
    ROOT_FOLDER
} = require('./config')
const buildPath = path.resolve(BLOG_FOLDER, 'public')

let isRunning = false

/**
 * 主体响应函数
 */
async function main() {
    if (isRunning) {
        logger.warn('Main process is running')
        return
    }

    isRunning = true
    
    let cloneSuccess = await gitClone(BLOG_GIT, BLOG_FOLDER)
    if (!cloneSuccess) {
        logger.error('clone blog fail')
        return
    }
    cloneSuccess = await gitClone(POST_GIT, POST_FOLDER)
    if (!cloneSuccess) {
        logger.error('clone posts fail')
        return
    }

    let buildSuccess = await hexoBuild(BLOG_FOLDER)
    if (!buildSuccess) {
        logger.error('hexo build fail')
        return
    }

    if (fs.existsSync(ROOT_FOLDER)) {
        fs.removeSync(ROOT_FOLDER)
    }
    fs.moveSync(buildPath, ROOT_FOLDER)

    isRunning = false
    logger.info('Main process is successful')
}

module.exports = {
    main
}
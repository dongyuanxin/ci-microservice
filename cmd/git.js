const { exec, logger } = require('./../util')
const fs = require('fs-extra')

/**
 * 下载仓库到指定文件夹
 * 
 * @param {string} depository 
 * @param {string} folder 
 */
async function gitClone(depository, folder) {
    if (fs.existsSync(folder)) {
        fs.removeSync(folder)
    }

    const cmd = `git clone --depth=1 ${depository} ${folder}`
    try {
        await exec(cmd)
        return true
    } catch (error) {
        logger.error(error)
        return false
    }
}

module.exports = {
    gitClone
}


// gitClone('git@git.dev.tencent.com:godbmw/xxoo521-template.git', '/Users/yuanxindong/Desktop/articles/ci-xxoo521/tmp/xxoo521')
// gitClone('git@git.dev.tencent.com:godbmw/xxoo521-posts.git', '/Users/yuanxindong/Desktop/articles/ci-xxoo521/tmp/xxoo521/source/_posts')
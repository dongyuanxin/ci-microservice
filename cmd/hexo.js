const { exec, logger } = require('./../util')

/**
 * 打包hexo工程
 * 
 * @param {string} folder
 */
async function hexoBuild(folder) {
    const cwd = process.cwd()
    const cmd = 'hexo clean && hexo g'

    // 更换工作目录, 执行打包操作
    // 然后再换回来
    try {
        process.chdir(folder)

        await exec('hexo clean && hexo g')
        await exec('rm -rf public/categories/**/page/')
        await exec('rm -rf public/tags/**/page/')

        process.chdir(cwd)

        return true
    } catch (error) {
        logger.error(error)
        return false
    }
}

module.exports = {
    hexoBuild
}

// hexoBuild('/Users/yuanxindong/Desktop/articles/ci-xxoo521/tmp/xxoo521')
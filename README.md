# CI Microservice

## 依赖包缓存

为了防止每次都重复运行`npm i`, 所以子仓库需要的依赖包，均写入`package.json`. 请手动更新。

## 安全配置

修改`config.js`中的`PORT`和`AUTH_PATH`。只有两者都对应上，才可以触发CI逻辑。

## 优点

- 传输数据小：只需要正确访问`AUTH_PATH`即可
- 触发方法多：支持cmd / 浏览器触发
- 日志完备：配合pm2更优
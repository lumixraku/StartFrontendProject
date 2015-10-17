# GulpfileDemo

#中文
最基础的配置,没有模块化加载的实现(webpack,cmd,adm == ),
可以在这个基础上自行拓展

##环境
- node v4.x
- gulp v3.x
- bower v2.x (也可以通过`npm install bower -g`)
- node-sass
- python 2.7.x
 - (browser-sync 在window下依赖Python 2.x)


##特征
- 编译SASS/SCSS -> CSS
- 压缩JS/HTML/CSS/图片
- 合并文件
- JS语法检测
- 添加后缀名
- 浏览器实时预览更新
- 清除文件


##目录结构及文件
- dist -- 发布目录
- src -- 源代码目录
- .gitignore -- github提交忽略
- gulpfile.js -- gulp配置文件
- package.json -- node配置文件
- .bowerrc -- 更改bower默认安装路径的环境文件
- .changelog -- 项目文件修改的日志记录

------------


# English
The most basic configuration, not modular loading (webpack, cmd, adm ==),
Free to expand on this basis

##surroundings
- Node v4.x
- Gulp v3.x
- Bower v2.x (You can also `npm install bower -g`)
- Node-sass
- Python 2.7.x
  - (Browser-sync dependence, when executed `npm install browser-sync`, at Windows)


## Features
- Compile SASS / SCSS -> CSS
- Compression JS / HTML / CSS / Pictures
- Merge Files
- JS Syntax Check
- Add suffixes
- Real-time preview update your browser
- Clear File


## Directory structures and file
- Dist - publishing directory
- Src - source code directory
- .gitignore - Github submit ignored
- Gulpfile.js - gulp profile
- Package.json - node configuration file
- .bowerrc - Change the default installation path bower environmental documents
- .changelog - Project file modification logging

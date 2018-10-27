## 初始化项目
```js
npm init -y
```

## 安装依赖包
webpack
```js
yarn add webpack webpack-cli webpack-dev-server
```
babel
```js
yarn add babel-loader @babel/core @babel/preset-env @babel/preset-react
```
react
```js
yarn add react react-dom react-router-dom react-router-redux redux react-redux redux-promise redux-thunk redux-logger redux-saga 
```
loader
```js
yarn add less less-loader css-loader style-loader url-loader html-webpack-plugin
```

## 目录结构划分
```
src
  containers 放置页面组件比如说Home
      components 放此页面组件独享的子组件
  components 放置页面之间可以共享的共用组件
  common 放一些公共的样式等内容
  images 放图片
  store redux仓库 
      reducers
      actions
      action-types
      index
  index.js入口文件
  index.html 模板文件
```

## 前后台交互套路
1. 定义仓库中的数据结构
2. 去后台实现这个接口
3. 前台编写一个请求此接口的API方法
4. 定义action-types,修改reducer并处理此动作
5. 编写一个action方法，用来调用API方法，请求接口，并得到返回的数据，构造action派发给仓库
6. 在组件里调用此方法,并且填 充仓库
7. 在组件使用此数据进行渲染



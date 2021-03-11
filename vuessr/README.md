# vuessr

此项目是因为之前公司需要在原有项目基础上做seo和优化首屏加载速度，由于不想过多的动之前的代码所以还是决定不用nuxt.js，所以选择自己去服务端渲染。做完以后我把基础的架子留存一下，觉得以后可能还会用到

### 开发思路

解决同构开发，依然使用webpack打包，我们要解决两个问题：服务端首屏渲染和客户端激活。

把router，store，app这三个变成工厂函数，每次请求的时候都创建一个独立的实例

新增两个文件entry-client.js,entry-server.js

```js
src 
├── router 
├────── index.js # 路由声明 
├── store 
├────── index.js # 全局状态 
├── main.js # 用于创建vue实例 
├── entry-client.js # 客户端入口，用于静态内容“激活” 
└── entry-server.js # 服务端入口，用于首屏内容渲染
```

打包配置在vue.config.js，里面有一些注释

服务器启动文件：./serve/ssr.js 



### 建议

这个demo可以直接clone使用，功能较单一，只是完成了ssr的需求


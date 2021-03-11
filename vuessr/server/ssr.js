const express = require('express');
const app = express();
// 获取绝对地址
const resolve= dir =>require('path').resolve(__dirname,dir)

// 开放dist/client目录，关闭默认下载index页的选项，不然到不了后面路由
app.use(express.static(resolve('../dist/client'),{index: false}))

const { createBundleRenderer } = require('vue-server-renderer');
// 服务端打包文件地址
const bundle = resolve('../dist/server/vue-ssr-server-bundle.json')
// 创建渲染器
const renderer = createBundleRenderer(bundle, { 
    runInNewContext: false, // https://ssr.vuejs.org/zh/api/#runinnewcontext 
    template: require('fs').readFileSync(resolve("../public/index.html"), "utf-8"), // 宿主文件 
    clientManifest: require(resolve("../dist/client/vue-ssr-client-manifest.json")) // 客户端清单 
});


app.get('*', async (req,res)=>{
    try {
        const context = {
            url: req.url
        }
        // req.url决定首屏的路由
        const html = await renderer.renderToString(context)
        res.send(html)
    } catch (error) {
        res.status(500).send('500 error')
    }
})

app.listen(7777, ()=>{
    console.log('running at: http://localhost:7777/');
})
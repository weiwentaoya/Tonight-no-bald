const express = require('express');
const app = express();
// 获取绝对地址
const resolve= dir =>require('path').resolve(__dirname,dir)

// 处理静态文件,开放目录，关闭默认的index打开功能
app.use(express.static(resolve('../dist/client'),{index: false}))

const { createBundleRenderer } = require('vue-server-renderer');
const bundle = resolve('../dist/server/vue-ssr-server-bundle.json')
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
        const html = await renderer.renderToString(context)
        res.send(html)
    } catch (error) {
        res.status(500).send('500 error')
    }
})

app.listen(3000)
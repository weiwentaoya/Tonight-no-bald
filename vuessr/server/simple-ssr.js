// express
const express = require('express');
const app = express();
const Vue = require('vue')

const { createRenderer } = require('vue-server-renderer');
const renderer = createRenderer();

const Router = require('vue-router')
Vue.use(Router)
const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes:[
        {
          path: '/',
          name: 'Home',
          component:{template: '<div>Home</div>'}
        },
        {
          path: '/about',
          name: 'About',
          component:{template: '<div>About</div>'}
        }
      ]
})

app.get('*', async (req,res)=>{
    const vm = new Vue({
        router,
        data(){
            return {
                message: 'hello word'
            }
        },
        template: `
        <div>
            <router-link to="/">index</router-link>
            <router-link to="/about">about</router-link>
            <div>{{message}}</div>
            <router-view></router-view>
        </div>
        `
    })
    
    try {
        console.log(req.url);
        
        router.push(req.url)
        const html = await renderer.renderToString(vm)
        res.send(html)
    } catch (error) {
        res.status(500).send('500 error')
    }
})
app.listen(3000)
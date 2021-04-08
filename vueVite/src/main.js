import { createApp, createRenderer,h } from 'vue'
import App from './App.vue'
import CanvasApp from './CanvasApp.vue'
import './index.css'

createApp(App)
.component('comp',{
    render(){
        return h('div', 'I am comp')
    }
})
.mount('#app')

// 自定义渲染器
const nodeOps = {
    createElement(tag){
        // 处理元素创建逻辑
        return {tag}
    },
    insert(child, parent, anchor){
        // 处理元素插入逻辑
        // 1.如果是子元素，不是真实的dom，此时只需要将数据保存到前面虚拟对象上即可
        // 2.如果是真实元素，这这里是canvas，需要绘制
        child.parent = parent
        if (!parent.childs) {
            parent.childs= [child]
        }else{
            parent.childs.push(child)
        }

        if (parent.nodeType == 1) {
            draw(child)
            if (child.onClick) {
                canvas.addEventlistener('click',()=>{
                    child.onClick()
                    setTimeout(()=>{
                        draw(child)
                    },0)
                })
            }
        }
    },
    patchProp(el, key, prevvalue, nextvalue){
        el[key] = nextvalue
    }
}
let canvas
const renderer = createRenderer(nodeOps)
function createCanvasApp(App) {
    const app = renderer.createApp(App)
    const mount = app.mount
    app.mount= function (selector) {
        canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = 200
        canvas.height = 200
        document.querySelector(selector).appendChild(canvas)
        mount(canvas)
    }
    return app
}
// createCanvasApp(CanvasApp).mount('#canvas')
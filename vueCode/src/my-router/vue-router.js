let _Vue;
export default class VueRouter{
    constructor(option){
        this.$option=option
        this.current = '/'
        _Vue.util.defineReactive(this,'matched',[])        
        window,addEventListener('hashchange',this.HashChange.bind(this))
        window,addEventListener('load',this.HashChange.bind(this))

    }
    match(routes){
        routes.forEach(route=>{
            if (this.current ==='/' && route.path==='/') {
                this.matched.push(route)
            }
            if (route.path !== '/' && this.current.indexOf(route.path) > -1) {
                this.matched.push(route)
            }
            if (route.children) {
                this.match(route.children);
            }
        })
    }
    HashChange(){
        this.current = window.location.hash.split('#').pop()
        this.matched=[]
        this.match(this.$option.routes)
    }
    static install(Vue){
        _Vue = Vue
        _Vue.mixin({
            beforeCreate(){
                if (this.$options.router) {
                    Vue.prototype.$router= this.$options.router
                }
            }
        })
        Vue.component('router-link', {
            props:{
                to:{
                    type: String
                }
            },
            render(h){
                return h('a',{attrs:{href: `#${this.to}`}},  this.$slots.default)
            },
        })
        Vue.component('router-view', {
            render(h){
                let depth = 0
                this.$vnode.data.routerView = true
                let parent = this.$parent
                while (parent) {
                    if (parent.$vnode&&parent.$vnode.data&&parent.$vnode.data.routerView) {
                        depth++
                    }   
                    parent = parent.$parent
                }
                return h(this.$router.matched[depth]?.component||null)
            },
        })
        
    }
}
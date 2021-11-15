let Vue = null;
class Store{
    constructor(options){
        this.options = options
        const computed = {}
        for (const key in this.options.getters) {
            computed[key]= ()=>this.options.getters[key](this.state)
        }
        this.vm = new Vue({
            data:  this.options.state,
            computed
        })
    }
    get getters(){
        return this.vm
    }
    get state(){
        return this.vm
    }
    commit(type, parameter){
        const fun = this.options.mutations[type]
        fun(this.state,  parameter)
    }
    dispatch(type, parameter){
        const fun = this.options.actions[type]
        fun(this,  parameter)
    }
}
function install(_Vue) {
    Vue = _Vue
    Vue.mixin({
        beforeCreate(){
            if (this.$options.store) {
                Vue.prototype.$store=this.$options.store
            }
        }
    })
}
export default {Store, install}
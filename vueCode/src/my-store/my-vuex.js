let _Vue
class Store{
    constructor(option){
        // console.log(option);
        this._mutations = option.mutations
        this._actions = option.actions
        this._wrappedGetters = option.getters
        const computed = {}
        this.getters ={}
        
        const store = this
        Object.keys(store._wrappedGetters).forEach(key=>{
            computed[key]=function () {
                return store._wrappedGetters[key](store.state)
            }
            Object.defineProperty( store.getters, key,
                {
                    get(){ return store._vm[key]} 
                }
            )
        })
        this._vm = new _Vue({
            data:{
                $$state:option.state
            },
            computed: computed
        })
        
        
        const { dispatch, commit } = this
        this.dispatch = function boundDispatch (type, payload) {
            return dispatch.call(store, type, payload)
        }
        this.commit = function boundCommit (type, payload, options) {
            return commit.call(store, type, payload, options)
        }
        
    }
    get state(){
        return this._vm._data.$$state
    }
    set state(v){
        console.log('set error');
        
    }
    commit(type,payload){
        this._mutations[type](this.state, payload)
    }
    dispatch(type,payload){
        return this._actions[type](this,payload)
    }
}
function install(Vue) {
    _Vue=Vue
    _Vue.mixin({
        beforeCreate(){
            if (this.$options.store) {
                _Vue.prototype.$store = this.$options.store
            }
        }
    })
}
export default {Store,install}
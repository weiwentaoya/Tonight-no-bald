let Vue;
export default class VueRouter {
    constructor(options) {
        this.options = options
        let count = window.location.hash.slice(1)||'/'
        Vue.util.defineReactive(this, 'count', count)
        window.addEventListener('hashchange',()=>{
            this.count = window.location.hash.slice(1)
        })
    }
}
VueRouter.install = function (_vue) {
    Vue = _vue;
    Vue.mixin({
        beforeCreate() {
            if(this.$options.router){
                Vue.prototype.$router = this.$options.router
            }

        }
    })
    Vue.component("router-link", {
        props: {
            to: {
                type: String,
                required: true, 
            },
        },
        render: function (h) {
            return h(
                "a",
                {
                    attrs: {
                        href: '#' + this.to,
                    },
                },
                this.$slots.default
            );
        },
    });
    Vue.component("router-view", {
        render: function (h) {
            const {component} = this.$router.options.routes.find(el=>el.path === this.$router.count)
            return h(component)
        },
    });
};
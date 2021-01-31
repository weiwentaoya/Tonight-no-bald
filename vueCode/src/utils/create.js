import Vue from "vue";
export default function create(Component,props) {
    
    // const vm = new Vue({
    //     render: h => h(Component, { props })
    // }).$mount();
    // console.log(vm);
    
    // document.body.appendChild(vm.$el)
    // const comp = vm.$children[0]
    // Component.props=props
    const contr = Vue.extend(Component)
    console.log(contr);
    
    const comp = new contr({propsData: props }).$mount();
    console.log(comp);
    document.body.appendChild(comp.$el)
    comp.remove = ()=>{
        document.body.removeChild(comp.$el)
        comp.$destroy()
    }
    return comp
}
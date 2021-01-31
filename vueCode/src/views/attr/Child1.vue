<template>
    <div>
        <h1>This is an c1 page</h1>
        {{$attrs}}
        <Child2 :bar="$attrs.bar" :foo="$attrs.foo"/>
        <Child2 v-bind="$attrs"/>

    </div>
</template>
<script>
import Child2 from "./Child2"

export default {
    // props:{
    //     foo:{
    //         default:''
    //     }
    // },
    components:{
        Child2
    },
    mounted(){
        
    }
}
</script>
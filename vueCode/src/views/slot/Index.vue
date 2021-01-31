<template>
    <div>
        <h1>This is an attr page</h1>
        <Child1>
            <template>插槽内容 </template>
            <template v-slot:content="scope" >content内容 {{scope}}</template>
        </Child1>
    </div>
</template>
<script>
import Child1 from "./Child1"

export default {
    components:{
        Child1,
    },
    mounted(){
    }
}
</script>
<style lang="scss">
    div{
        border: 1px solid salmon;
    }
</style>
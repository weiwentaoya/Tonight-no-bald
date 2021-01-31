<template>
    <div>
        <h1>This is an bus page</h1>
        <Child1/>
        <Child2/>
    </div>
</template>
<script>
import Child1 from "./Child1"
import Child2 from "./Child2"

export default {
    components:{
        Child1,
        Child2
    },
    mounted(){
        console.log(this.$children);
    }
}
</script>
<style lang="scss">
    div{
        border: 1px solid salmon;
    }
</style>
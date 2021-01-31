<template>
    <div>
        <h1>This is an c1 page</h1>
    </div>
</template>
<script>
export default {
    mounted(){
        console.log('C1 等待监听 C2发生的消息');
        this.$parent.$on('event-c2', msg => {
            console.log(`C1 获取到C2传递的值：${msg}`)
        })
    }
}
</script>
<template>
    <div>
        <h1>This is an c2 page</h1>
        <button @click="sendToC1">C2 发送消息给 C1</button>
    </div>
</template>
<script>
export default {
    methods:{
        sendToC1(){
            this.$bus.$emit('event-c2','c2-c1')
        }
    }
}
</script>
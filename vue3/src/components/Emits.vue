<template>
    <!-- 当自定义事件于原生事件同名时会发生触发两次的bug解决方案是修改事件名称或添加到emits选项中 -->
    <div>
        <button @click="$emit('click')">自定义事件</button>
        
    </div>
</template>

<script>
export default {
    // emits:['click'],
    setup () {
        return {}
    }
}
</script>

<style scoped>

</style>
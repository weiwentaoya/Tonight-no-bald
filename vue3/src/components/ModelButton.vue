<template>
    <div>
        <button @click="modelType= true">打开模态框</button>
        <!-- 传送门 -->
        <teleport to='body'>
            <div v-if="modelType">
                <div>这里是一个模态框</div>
                <div>父元素为body</div>
                <button @click="modelType= false">关闭模态框</button>
            </div>
        </teleport>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    setup () {
        
        const modelType = ref(false)
        return {modelType}
    }
}
</script>

<style scoped>

</style>
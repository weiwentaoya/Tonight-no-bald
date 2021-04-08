<template>
    <div>
        <button @click="modelOpen = true">TeleportModel</button>
        <teleport to='body' >
            <div v-if="modelOpen" class="model">
                <div>
                    这是一个弹窗我的父元素是body
                    <button @click="modelOpen = false">关闭</button>
                </div>
            </div>
        </teleport>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
    setup () {
        const state = reactive({
            modelOpen: false,
        })
    
        return {
            ...toRefs(state),
        }
    }
}
</script>
<style scoped>
    .model{
        width: 200px;
        height: 60px;
        background: rgba(250, 128, 114, 0.2);
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
    }
</style>

<template>
    <div @click="$emit('myclick')">
        FragmentsEmits
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
    // emits:['click'],
    setup () {
        const state = reactive({
            count: 0,
        })
    
        return {
            ...toRefs(state),
        }
    }
}
</script>

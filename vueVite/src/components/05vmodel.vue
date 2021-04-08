<template>
    <div @click="$emit('update:count', count+1)">
        {{count}}
    </div>
</template>

<script>
    export default {
        props: {
            count: {
                type: Number,
                default: 0
            },
        },
    }
</script>

<style scoped>

</style>
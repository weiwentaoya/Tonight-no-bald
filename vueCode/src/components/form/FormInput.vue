<template>
    <div>
        <input :type="type" :value="value" @input="onInput" v-bind="$attrs">
        <!-- v-bind="$attrs" 展开没有被props接受的参数，比如: placeholder -->
    </div>
</template>

<script>
    export default {
        inheritAttrs: false,
        props:{
            value:{
                type: String,
                default: ''
            },
            type:{
                type: String,
                default: 'text'
            }
        },
        methods:{
            onInput(e){
                // 在组件上使用v-model时会自动注册$on
                this.$emit('input', e.target.value)
                this.$parent.$emit('validator')
            }
        }
    }
</script>


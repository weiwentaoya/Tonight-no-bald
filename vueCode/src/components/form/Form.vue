<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        provide(){
            return {
                elForm: this
            }
        },
        props: {
            model: {
                type: Object,
                required: true
            },
            rules: {
                type: Object,
            },
        },
        methods: {
            validate(cb) {
                const promises =this.$children.filter(el=>el.prop).map(el=>el.validator())
                Promise.all(
                    promises
                ).then(()=>{
                    cb(true)
                }).catch(()=>{
                    cb(false)
                })
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>
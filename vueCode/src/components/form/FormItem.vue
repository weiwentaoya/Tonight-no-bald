<template>
    <div>
        <label v-if="label">{{label}}</label>
        <slot></slot>
        <div class="error">{{error}}</div>
        <!-- {{elForm.model[prop]}} -->
        <!-- {{elForm.rules[prop]}} -->
    </div>
</template>

<script>
    import AsyncValidator from 'async-validator';
    export default {
        inject: ['elForm'],
        props: {
            label: {
                type: String,
                default: ''
            },
            prop: {
                type: String,
            },
        },
        data() {
            return {
                error: ''
            }
        },
        mounted(){
            this.$on('validator',()=>{
                this.validator()
            })
        },
        methods: {
            validator() {
                const value = this.elForm.model[this.prop]
                const rule = this.elForm.rules[this.prop]
                const descriptor = {};
                descriptor[this.prop] = rule
                const model = {};
                model[this.prop] = value;
                const validator = new AsyncValidator(descriptor);
                return validator.validate(model, error=>{
                    console.log(error);
                    if (error) {
                        this.error = error[0].message
                    }else{
                        this.error = ''
                    }
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
.error{
    color: #ff1100;
}
</style>
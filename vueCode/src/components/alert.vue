<template>
    <div class="alert">
        <div class="title">{{title}}</div>
        <div >{{message}}</div>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: ''
            },
            message: {
                type: String,
                default: ''
            },
            description: {
                type: String,
                default: '3000'
            },
        },
        mounted(){
            setTimeout(() => {
                this.remove()
            }, this.description);
        }
    }
</script>

<style lang="scss" scoped>
.alert{
    position: fixed;
    left: 50%;
    top: 50px;
    border: 1px solid salmon;
}
</style>
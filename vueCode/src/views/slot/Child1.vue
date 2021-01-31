<template>
    <div>
        <h1>This is an c1 page</h1>
        <slot></slot>
        <slot name="content" :msg="msg"></slot>
    </div>
</template>
<script>

export default {
    // props:{
    //     foo:{
    //         default:''
    //     }
    // },
    data(){
        return {
            msg: 'hello slot'
        }
    },
    components:{
    },
    mounted(){
        
    }
}
</script>
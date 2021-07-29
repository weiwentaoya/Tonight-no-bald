<template>
    <div>
        <h1>{{name}}</h1>
        <h2>{{age}}</h2>
        <h2>{{job.type}}</h2>
        <h2>{{job.salary}}</h2>
        <button @click="change">button</button>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    setup () {
        let name = ref('张三')
        let age = ref(18)
        let hobby = ref(['抽烟','喝酒','烫头'])
        let job = ref({
            type:'工程师',
            salary: '98k'
        })
        function change(){
            console.log(name);
            console.log(age.value);
            console.log(job);
            console.log(job.value);
            console.log(hobby);
            console.log(hobby.value);
        }
        return {name, age, job, change}
    }
}
</script>

<style scoped>

</style>
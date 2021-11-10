<template>
    <div>
        
        <!-- <h1 data-h1 @click="addCount">about {{ count}}</h1> -->
        <!-- <Rate :width="width" @updateRate="updateRate" /> -->
        <!-- <Rate2 v-model:width="width" > 课程评分 </Rate2> -->
        <!-- <h3>{{width}}</h3> -->
        <Animation></Animation>

    </div>
</template>

<script setup>
import {ref} from 'vue'
import Rate from './rate.vue'
import Rate2 from './rate2.vue'
import Animation from './animation.vue'
const count = ref(0)
const color = ref('red')
function addCount(){
    count.value++
    color.value = Math.random()>0.5?'red':'blue'
}
const width = ref(3.5)
function updateRate(num){
    width.value = num.value
}
</script>

<style scoped>
h1{
    color: v-bind(color)
}
</style>
<template>
  <div>
    <!-- <div class="box" :style="{ width: width + 'px' }"></div> -->
    <transition mode="box1">
        <div  class="box1" :style="{ width: width + 'px' }"></div>
    </transition>
    <button @click="changeWidth">change</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
const width = ref(100);
function changeWidth(params) {
    width.value+=100
}
</script>

<style scoped>
.box {
  height: 100px;
  background: violet;
  transition: width 0.5s linear;
}
.box1{
    height: 100px;
    background: salmon;
}
.box1-enter-active{
    transition: width 0.5s linear;
}
</style>
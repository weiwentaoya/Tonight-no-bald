<template>
  <div class="rate" @mouseout="mouseout">
      <span @mouseover="mouseover(num)" v-for="num in 5" :key="num">☆</span>
      <span class="hollow" :style="fontWidth">
          <span @mouseover="mouseover(num)" v-for="num in 5" :key="num">★</span>
      </span>
  </div>
</template>

<script setup>
import { defineProps,defineEmits, computed, ref } from "vue";
const props = defineProps({
  score: Number,
  theme: { type: String, default: "red" },
  width: Number
});
const emit = defineEmits(['updateRate'])
const width = ref(props.width)

function mouseover(num) {
    width.value = num
    emit('updateRate', width)
}
function mouseout() {
    width.value = props.width
    emit('updateRate', width)
}
const fontWidth = computed(()=> `width:${width.value}em;`)
</script>

<style scoped>
.rate {
  position: relative;
  display: inline-block;
}
.rate > span.hollow {
  position: absolute;
  display: inline-block;
  top: 0;
  left: 0;
  width: 0;
  overflow: hidden;
}
</style>
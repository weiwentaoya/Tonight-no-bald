<template>
    <p @click="count++">count is: {{ counter }}</p> 
    <p >doubleCounter is: {{ doubleCounter }}</p> 
    <p>{{msg2}} </p>
    <p ref="desc"></p>
</template>

<script>
import {computed, onMounted, onUnmounted, reactive, ref, toRefs, watch} from 'vue'
export default {
  name: 'HelloWorld',
  setup() {
    const {counter, doubleCounter} = useCount()
    const msg2 = ref('some message')
    const desc = ref(null)
    watch(counter, (val,oldval)=>{
      const p = desc.value
      p.textContent=`${val} to ${oldval}`
      console.log(desc);
    })
    return { counter, doubleCounter, msg2, desc }
  }
}
function useCount() {
  const data = reactive({
    counter: 1,
    doubleCounter: computed(()=> data.counter *3)
  })
  let timer
  onMounted(()=>{
    timer = setInterval(() => {
      data.counter++
    }, 1000);
  })
  onUnmounted(()=>{
    clearInterval(timer)
  })
  return toRefs(data)
}
</script>

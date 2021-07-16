<template>
  <h1>{{ msg }}</h1>
  <p> {{msg}}</p>
  <p>{{counter}}</p>
  <p>{{doubleCounter}}</p>
  <p ref="desc"></p>
  <ModelButton></ModelButton>
  <Emits @click="clickMe"></Emits>
</template>

<script>
import {computed, onMounted, onUnmounted, reactive, ref, toRefs, watch} from 'vue';
import ModelButton from './ModelButton.vue';
import Emits from './Emits.vue';
export default {
  name: 'HelloWorld',
  components:{ModelButton,Emits},
  props: {
    msg: String
  },
  
  setup() {
    const {counter,doubleCounter } = useCount()
    const desc = ref(null)
    watch(counter,(newVal, oldVal)=>{
      const p = desc.value
      p.textContent = `value change from ${oldVal} to ${newVal}`
    })
    function clickMe(){
      console.log('clickMe');
    }
    const msg = ref('some message')
    return {counter,doubleCounter, msg, desc, clickMe}
  },

  
}

function useCount() {
  const data = reactive({
    counter:1,
    doubleCounter:computed(()=>data.counter*2)
  })
  let timer
  onMounted(()=>{
    timer = setInterval(() => {
      data.counter++
    }, 1000);
  })
  onUnmounted(()=>{clearInterval(timer)})
  return toRefs(data)
}
</script>

<template>
    <div>
      <h1>{{ msg }}</h1>
      <!-- <Composition></Composition> -->
      <!-- <TeleportModel></TeleportModel> -->
      <!-- <FragmentsEmits @myclick="getMessage"></FragmentsEmits> -->
      <!-- <CustomRenderer ></CustomRenderer> -->
      <!-- <Vmodel v-model:count="count"></Vmodel> -->
      <!-- 等价于 -->
      <!-- <Vmodel :count="count" @update:count="count = $event"></Vmodel> -->
      <!-- <Render v-model:count="count">
        <template v-slot:default="">default</template>
        <template v-slot:footer="">footer</template>
      </Render> -->
      <!-- <Functional text="Functional:text" v-model:count="count">这里是slot</Functional> -->
      <RefFunction ></RefFunction>
    </div>
</template>

<script>
import Composition from "./01Composition.vue";
import TeleportModel from "./02TeleportModel.vue";
import FragmentsEmits from "./03FragmentsEmits.vue";
import CustomRenderer from "./04CustomRenderer.vue";
import Vmodel from "./05vmodel.vue";
import Functional from "./06Functional.js";
import RefFunction from "./07RefFunction.vue";
import { h } from 'vue'
export default {
  name: 'HelloWorld',
  components:{
    Composition,
    TeleportModel,
    FragmentsEmits,
    CustomRenderer,
    Vmodel,
    Functional,
    RefFunction,
    Render: {
      props: {
        count: {
          type: Number,
          default: 0
        },
      },
      methods: {
        onclick(){
          this.$emit('update:count', this.count+1)
        }
      },
      render() {
        return h('div',[
          h('p',{onclick:this.onclick}, [
            this.$slots.default(),
            `${this.count}`,
            this.$slots.footer()
          ])
        ])
      },
    },
  },
  props: {
    msg: String
  },
  data() {
    return {
      count: 0
    }
  },
  methods: {
    getMessage(){
      console.log(111)
    }
  },
 
}

</script>

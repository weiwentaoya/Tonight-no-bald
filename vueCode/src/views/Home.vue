<template>
  <div class="home">
    <h1>This is an home page</h1>
    <p>{{$store.state.count}}</p>
    <p>doubleCount: {{$store.getters.doubleCount}}</p>
    <p @click="$store.commit('add')">count: {{$store.state.count}}</p>
    <p @click="$store.dispatch('add',12)">async count: {{$store.state.count}}</p>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
  },
  mounted () {
    // console.log(this.$store);
  },
};
</script>

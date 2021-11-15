<template>
  <div id="app">
    <!-- <div class="content">
      <router-link class="link" to="/parent">parent</router-link>
      <router-link class="link" to="/slot">slot</router-link>
      <router-link class="link" to="/link">link</router-link>
    </div> -->
    <router-link to="/">首页</router-link>
    <router-link to="/about">关于</router-link>
    <router-view />
    <p>{{$store.state.count}}</p>
    <p>{{$store.getters.doubleCount}}</p>
    <p>{{$store.getters.tripleCount}}</p>
    <button @click="$store.commit('add', 10)">countAdd</button>
    <button @click="$store.dispatch('add', 5)">asyncCountAdd</button>
  </div>
</template >
<script>
export default {
  beforeCreate(){
    
  }
}
</script>
<style lang="scss" >
  #app{
    text-align: center;
  }
  .content{
    margin-top: 100px;
    display: flex;
    justify-content: center;
  .link{
    margin: 0 4px;
  }

  }
</style>
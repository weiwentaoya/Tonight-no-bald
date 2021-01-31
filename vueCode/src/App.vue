<template>
  <div id="app">
    <div class="content">
      <router-link class="link" to="/parent">parent</router-link>
      <router-link class="link" to="/slot">slot</router-link>
      <router-link class="link" to="/link">link</router-link>
    </div>
    <router-view />
  </div>
</template >
<script>
export default {
  
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
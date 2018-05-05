<template>
  <div class="container">
    <NavBar class="nav"></NavBar>
    <router-view class="router"></router-view>
  </div>
</template>

<script>
import NavBar from './adminComponents/nav-bar'
export default {
  components: {
    NavBar,
  },
}
</script>

<style scoped>
.nav {
  width: 10vw;
  height: 100vh;
}
.container {
  display: flex;
  justify-content: flex-start;
}
.router {
  width: 90vw;
}
</style>

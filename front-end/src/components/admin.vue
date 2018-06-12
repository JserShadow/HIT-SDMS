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
  beforeRouteEnter(to, from, next) {
    if (to.fullPath === '/admin') {
      next(vm => {
        vm.$router.push('/admin/info');
      });
    } else {
      next();
    }
  }
}
</script>

<style scoped>
.nav {
  width: 20vw;
}
.container {
  display: flex;
  justify-content: flex-start;
}
.router {
  width: 90vw;
}
</style>

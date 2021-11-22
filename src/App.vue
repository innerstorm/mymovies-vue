<template>
  <Header />
  <router-view />
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: { Header }  
}
</script>

<style lang="scss">
  @import './scss/main.scss';

  .main-nav a.router-link-exact-active {
    color: red;
  }


</style>

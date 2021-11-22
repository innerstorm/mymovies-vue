<template>
  <div id="nav" class="main-nav">
    <div class="flex items-center">
      <Logo />
      <div class="nav">
        <router-link to="/">Home</router-link> 
        <router-link :to="{ name: 'Profile' }">Profile</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from './Logo.vue'

export default {
    name: 'Header',
    components: { Logo }
}
</script>

<style>

</style>
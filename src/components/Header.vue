<template>
  <div id="nav" class="main-nav p-3 bg-grey-darkest mb-8">
    <div class="flex items-center">
      <router-link to="/" class="flex-none" title="Home">
         <img src="../assets/logo.png" alt="" class="w-12">
      </router-link> 
      
      <div class="flex-grow ml-6">
        <search-bar />
      </div>

      <div class="nav flex-none pr-4">
        <router-link :to="{ name: 'Profile' }" class="link" title="Profile Page">
          <vue-feather type="user" size="20"></vue-feather>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from './SearchBar.vue'

export default {
  components: { SearchBar },
  name: 'Header',
}
</script>

<style>

</style>
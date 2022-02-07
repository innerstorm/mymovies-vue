<template>
  <Header />
  <div class="container mx-auto page-content page-profile">

    <div v-if="isUserLoggedIn">

      <div class="sub-head flex flex-nowrap items-center justify-between">
        <h1 class="inline">Hello, {{ $store.state.user.displayName }}</h1>
        <!-- <a href="" class="btn">settings</a>   -->
      </div>
      
      <div class="flex items-center">
        <div class="avatar w-40 mr-5">
          <img :src="$store.state.user.photoURL" alt="avatar" class="rounded-full">
        </div>

        <div>
          <ul>
            <li><strong>uid:</strong> {{ $store.state.user.uid }}</li>
            <li><strong>Username:</strong> {{ $store.state.user.displayName }}</li>
            <li><strong>Email address:</strong> {{ $store.state.user.email }}</li>
            <li><strong>Last login time:</strong> {{ $store.state.user.metadata.lastSignInTime }}</li>
          </ul>
        </div>
      </div>
      
      <div class="flex justify-between">
        <!-- <a href="" class="btn btn-primary">download data</a>
        <a href="" class="btn btn-outline">delete account</a> -->
      </div>

    </div>

  </div>
</template>

<script>
import Header from '../components/Header.vue'

export default {
  name: 'Profile',
  components: { Header },

  data() {
    return {
      isUserLoggedIn: false
    }
  },

  created() {
    this.isUserLoggedIn = this.$store.state.user !== null
    if (!this.isUserLoggedIn) {
      this.$router.push('/login')
    }
  }
}
</script>

<style>

</style>

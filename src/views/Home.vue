<template>

  <!-- if logged in: dashboard -->
  <Dashboard v-if="isLoggedIn" />

  <!-- if not logged in -->
  <div v-if="!isLoggedIn" class="flex items-center justify-center h-screen text-center">
      <div>
        <h1 class="mb-8">Moviecards</h1>
        <router-link to="/login" class="btn btn-lg">Sign in</router-link>
      </div>
  </div>

</template>

<script>
import firebase from 'firebase'
import { mapState } from 'vuex'
import Dashboard from '../components/Dashboard.vue'

export default {
  components: {
    Dashboard
  },

  data() {
    return {
      isLoggedIn: false
    }
  },

  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.isLoggedIn = user !== null
    })
  }, 
}
</script>

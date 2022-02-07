<template>
  <div class="navbar mb-2 bg-black">

    <div class="flex-1 px-2 lg:flex-none">
      <router-link :to="{ name: 'Home'}" class="flex-none" title="Home">
         <img src="../assets/logo.png" alt="" class="w-12">
      </router-link>
    </div> 

    <div class="flex justify-end flex-1 px-2">
      <div class="flex items-stretch">
        <div class="dropdown dropdown-end">
          <div tabindex="0" class="btn btn-ghost rounded-btn">
            <span class="mr-3">{{ $store.state.name }}</span>  
            <vue-feather type="settings" size="20" class="mr-2"></vue-feather>
          </div> 
          <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <router-link :to="{ name: 'Profile' }" title="Profile Page">
                <vue-feather type="user" size="20" class="mr-2"></vue-feather>Profile Page
              </router-link>
            </li> 
            <li>
              <a @click="logOut">
                <vue-feather type="log-out" size="20" class="mr-2"></vue-feather>
                Sign Out
              </a>
            </li> 
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import SearchBar from './SearchBar.vue'

export default {
  name: 'Header',
  components: { SearchBar },

  methods: {
    logOut() {
      firebase.auth().signOut()
      this.$router.push('/')
    }
  }
}
</script>

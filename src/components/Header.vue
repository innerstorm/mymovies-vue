<template>
  <div class="navbar mb-2 bg-base-300">

    <div class="flex-1 px-2 lg:flex-none">
      <router-link :to="{ name: 'Dashboard'}" class="flex-none" title="Home">
         <img src="../assets/logo.png" alt="" class="w-10">
      </router-link>
    </div> 

    <div class="flex justify-end flex-1 px-2">
      <div class="flex items-stretch">
        <div class="dropdown dropdown-end">
          
          <div tabindex="0" class="btn btn-ghost rounded-btn">
            <span class="mr-3">{{ user.displayName }}</span>  
            <img :src="user.photoURL" alt="avatar" class="rounded-full w-8">
          </div> 
          
          <ul tabindex="0" class="p-2 shadow-lg menu dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <router-link :to="{ name: 'Profile' }" title="Your Profile">
                <vue-feather type="user" size="20" class="mr-2"></vue-feather>Your Profile
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

import { computed } from 'vue'
import { useStore } from 'vuex'
import SearchBar from './SearchBar.vue'


export default {
    name: 'Header',
    components: { SearchBar },

    setup () {
        const store = useStore()
        const user = computed(()=> store.state.user)

        // logout via store
        const logOut = () => {
            store.dispatch('userLogout')
        }

        return {
            logOut,
            user
        }
    }
}
</script>

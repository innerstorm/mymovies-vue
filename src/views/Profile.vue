<template>
  <Header />
  <div class="container mx-auto page-content page-profile">
    <div>
      <div class="sub-head flex flex-nowrap items-center justify-between">
        <h1 class="inline">Hello, {{ user.displayName }}</h1>
      </div>

      <div class="flex items-center">
        <div class="avatar w-40 mr-5">
          <img :src="user.photoURL" alt="avatar" class="rounded-full" />
        </div>

        <div>
          <ul>
            <li><strong>uid:</strong> {{ user.uid }}</li>
            <li><strong>Username:</strong> {{ user.displayName }}</li>
            <li><strong>Email address:</strong> {{ user.email }}</li>
            <!-- <li><strong>Last login time:</strong> {{ user.metadata.lastSignInTime }}</li> -->
          </ul>
        </div>
      </div>

      <div class="flex">
        <pre>{{ user }}</pre>
      </div>

      <div class="flex justify-between">
        <!-- <a href="" class="btn btn-primary">download movie data</a>
        <a href="" class="btn btn-outline">delete account</a> -->
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import Header from "../components/Header.vue";

export default {
  name: "Profile",
  components: { Header },

  setup() {
    const store  = useStore()
    const user   = computed(() => store.state.user)
    const movies = computed(() => store.state.movies)
    
    return {
      user,
      movies
    };
  },
}
</script>
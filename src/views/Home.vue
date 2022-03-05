<template>
    <!-- if not logged in -->
    <!-- <div v-if="!isLoggedIn" class="flex items-center justify-center h-screen text-center">
        <div>
            <h1 class="mb-8">Moviecards</h1>
            <router-link to="/login" class="btn btn-lg">Sign in</router-link>
        </div>
    </div> -->

    <!-- if logged in: dashboard -->
    <Dashboard />
</template>

<script>
import { ref } from "vue"
import { useStore } from "vuex";
import Dashboard from "../components/Dashboard.vue";

export default {
    components: {
        Dashboard
    },

    // setup() {
    //     const isLoggedIn = ref(false)
    //     const store = useStore()
    //     isLoggedIn.value = store.state.user !== null

    //     return {
    //         isLoggedIn
    //     }
    // },
};
</script>

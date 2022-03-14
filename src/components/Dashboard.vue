<template>
    <Header />

    <MovieSearch />


    <div class="container mx-auto page-content page-home">
        <div v-if="dataIsLoading">
            loading...
        </div>

        <div v-else>
            <MoviesList :moviesList="moviesList"/>
        </div>

        
    </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { auth, database } from '../firebase/config'
import { onAuthStateChanged } from "firebase/auth";
import { getDatabase, child, get, ref, onValue } from "firebase/database";

import Header from './Header.vue'
import MoviesList from './MoviesList.vue'
import MovieSearch from './MovieSearch.vue'

export default {
    name: 'Dashboard',
    components: { Header, MoviesList, MovieSearch },
    setup() {

        const store = useStore()
        const movies = computed(()=> store.state.movies)
        //const user = computed(()=> store.state.user) 
        const dataIsLoading = false

        const da = null

   



        onAuthStateChanged(auth, (user) => {
            if (user) {
                const userId = auth.currentUser.uid;

                const dbRef = ref(getDatabase())

                get(child(dbRef, `users/${userId}`))
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            console.log(snapshot.val());
                            //context.commit('setMovies', snapshot.val())
                        } else {
                            console.log("No data available");
                        }
                    })
                    .catch((e) => {
                        console.log(e);
                    });


            } else {
                console.log('IS NOT')
            }
        })
        


















        // load the data on page load
        const moviesList = movies

        return {
            moviesList,
            dataIsLoading
        }
    },
}
</script>

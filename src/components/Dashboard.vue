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
import { auth, db } from '../firebase/config'
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

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const userId = auth.currentUser.uid;
                //const userRef = db.ref(`users/${userId}`);


                const dbRef = ref(getDatabase());
                
                get(child(dbRef, 'movies'))
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            const moviesList = snapshot.val()
                            //store.commit('setMovies', moviesList)
                            console.log(moviesList)

                        } else {
                            // no data
                            console.log('no data')
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });

                    console.log(userId)
   
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

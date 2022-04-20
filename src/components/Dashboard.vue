<template>
    <Header />

    <MovieSearch />


    <div class="container mx-auto page-content dashboard">
        <div v-if="dataIsLoading">
            loading...
        </div>

        <div v-else>
            <MoviesList />
        </div>

        
    </div>
</template>

<script>
import { ref } from 'vue'
import firebase from "firebase/app"
import { useRouter } from 'vue-router'
import store from '../store'

import Header from './Header.vue'
import MoviesList from './MoviesList.vue'
import MovieSearch from './MovieSearch.vue'

export default {
    name: 'Dashboard',
    components: { Header, MoviesList, MovieSearch },
    setup() {

        const dataIsLoading = ref(true)
        const router = useRouter()

        console.log('enter dashboard\n from login:', store.state.fromLogin)

        firebase.auth().onAuthStateChanged(async (user) => {

            if (user) {

                const reference = await firebase.database().ref(user.uid)
                
                reference.on('value', (snapshot) => {
                    if (snapshot.val() !== null) {
                        // we do have movies

                        // convert object to array
                        let moviesArray = Object.values(JSON.parse(JSON.stringify(snapshot.val().movies)))
                        
                        // reverse order of array
                        moviesArray = moviesArray.slice().reverse()
                        
                        // store movies data in store
                        store.commit('setMovies', moviesArray)

                        // loading of movies successfully failed :P
                        dataIsLoading.value = false

                    } else {
                        // no movies in the database
                        console.log('no movies')
                        dataIsLoading.value = false
                    }
                })
                // ...
            } else {
                // User is signed out
                router.push('/login')
            }
        });

        return {
            dataIsLoading,
        }
    },
}
</script>

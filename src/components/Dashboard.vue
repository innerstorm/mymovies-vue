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
import { ref } from 'vue'
import firebase from "firebase/app"
import { useRouter } from 'vue-router'
import Header from './Header.vue'
import MoviesList from './MoviesList.vue'
import MovieSearch from './MovieSearch.vue'

export default {
    name: 'Dashboard',
    components: { Header, MoviesList, MovieSearch },
    setup() {
        const dataIsLoading = ref(true)
        const router = useRouter()

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const reference = firebase.database().ref(user.uid)
                reference.on('value', (snapshot) => {
                    if (snapshot.val() !== null) {
                        // we do have movies
                        console.log(snapshot.val())
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
            dataIsLoading
        }
    },
}
</script>

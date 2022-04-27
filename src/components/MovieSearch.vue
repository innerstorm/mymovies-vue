<template>
<div class="container mx-auto page-content page-home">
    <div class="mb-8">
        <input 
            v-model="searchTerm" 
            type="text" 
            autocomplete="false"
            class="input input-lg input-bordered w-full" 
            placeholder="search movie title..."
            @keydown.enter="searchMovie"
        >
    </div>

    <div class="my-10" v-if="searchTerm">
        <h2 class="font-thin">{{ numberOfSearchResults }} results for: <span class="font-bold">{{ searchTerm }}</span></h2> 
    </div>

</div>
</template>

<script>
import { ref, watch, computed } from 'vue'
import { useStore } from 'vuex'
import List from './List.vue'

import { OMDB_API } from '../config/omdb'

export default {
    components: { List },
    name: 'MovieSearch',

    setup() {
        const store = useStore()

        const searchTerm = ref(store.state.searchTerm)

        const filterMoviesByTitle = (movies, searchTerm) => {
            return movies.filter(movie => {
                return movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
            })
        }

        watch(searchTerm, (newValue) => {
            store.commit('setSearchTerm', newValue)
            store.commit('setSearchResults', filterMoviesByTitle(store.state.movies, newValue))
        })  

        const fetchOMDB = async (searchTerm) => {

            //${omdb_api_url}?s=${q}&plot=short&type=movie&apikey=${omdb_api_key}

            const response = await fetch(`${OMDB_API.api_url}/?apikey=${OMDB_API.api_key}&s=${searchTerm}`)
            const data = await response.json()
            return data
        }

        const searchMovie = () => {
            console.log('SEARCH: ',searchTerm.value)
            fetchOMDB(searchTerm.value).then(data => {
                if (data.Response == "True") {
                    console.log('\nDATA: ', data)
                } else {
                    console.log('\nNO DATA')
                }


                
                //store.commit('setSearchResults', data.Search)
                //store.commit('setNumberOfSearchResults', data.totalResults)
            })
        }

        return {
            searchTerm,
            searchMovie,
            numberOfSearchResults: computed(() => store.state.searchResults.length),
            searchResults: computed(() => store.state.searchResults),
        }
    }
}
</script>

<style>

</style>
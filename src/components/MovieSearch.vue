<template>
<div class="container mx-auto page-content page-home">
    <div class="mb-8">
        <input 
            v-model="searchTerm" 
            type="text" 
            autocomplete="false"
            class="input input-lg input-bordered w-full" 
            placeholder="search movie title..."
            >
    </div>

    <div class="my-10" v-if="searchTerm">
        <h2 class="font-thin">{{ numberOfSearchResults }} results for: <span class="font-bold">{{ searchTerm }}</span></h2> 
    </div>

    <!-- <List :movies="searchResults" v-if="searchTerm" /> -->

</div>
</template>

<script>
import { ref, watch, computed } from 'vue'
import { useStore } from 'vuex'
import List from './List.vue'

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

        return {
            searchTerm,
            numberOfSearchResults: computed(() => store.state.searchResults.length),
            searchResults: computed(() => store.state.searchResults),
        }
    }
}
</script>

<style>

</style>
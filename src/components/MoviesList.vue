<template>
    <section class="page-content page-movies-list">
        <h1>{{ moviesNr }} Movies</h1>

        <div class="mb-8">
            <input v-model="searchTerm" type="text" name="search" id="search" class="bg-gray-300 w-full py-4 text-gray-900" placeholder="Search Movie Title...">
        </div>

        <div class="text-center my-10">
            {{ searchTerm }}
        </div>

        <div class="movies-list text-white w-full flex flex-wrap">
            <div v-for="movie in moviesList" :key="movie.title" class="lg:w-1/4 xl:w-1/6 pb-8 px-4">
                <movie-card :movie="movie" />
            </div>
        </div>

    </section>
</template>

<script>
import MovieCard from './MovieCard.vue'
import { ref } from 'vue'

export default {
    components: { MovieCard },
    props: ['moviesList'],
    name: 'MoviesList',

    setup(props) {
        const moviesNr = Object.keys(props.moviesList).length
        return { moviesNr }
    },

    data () {
        return {
            searchTerm: ''            
        }

    }
}

</script>

<style>

</style>
<template>
    <div class="movies-list flex flex-wrap">
        <div v-for="movie in movies" :key="movie.id" class="movie-list-item pb-8 px-4 xs:w-1/2 sm:w-1/3 md:w-1/8 lg:w-1/4 xl:w-1/6">
            <MovieCard :movie="movie" />
        </div>
    </div>  
</template>

<script>
import MovieCard from './MovieCard.vue'

export default {
    components: {
        MovieCard
    },

    props: ['movies'],
}
</script>

<style>
.movies-list {
        margin-left: -1rem;
        margin-right: -1rem;;
    }
</style>


  
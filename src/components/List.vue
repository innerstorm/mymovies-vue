<template>
    <div class="movies-list flex flex-wrap">
        <div v-for="movie in movies" :key="movie.id" class="movie-list-item pb-8 px-4 xs:w-1/2 sm:w-1/3 md:w-1/8 lg:w-1/4 xl:w-1/6">
            <MovieCard 
                :movie="movie" 
                @show-modal="showMovieDetails(movie)"
            />
        </div>
    </div> 

    <MovieCardModal 
        :movie="movieDetails" 
        :show="showModal"
        @close-modal="closeMovieDetails"
    />
</template>

<script>
import { ref } from 'vue'
import MovieCard from './MovieCard.vue'
import MovieCardModal from './MovieCardModal.vue'
export default {
    components: {
        MovieCard,
        MovieCardModal,
    },

    props: ['movies'],

    setup() {

        const movieDetails = ref({})
        const showModal = ref(false)

        const go = () => {
            console.log('go')
        }

        const showMovieDetails = (data) => {
            movieDetails.value = data
            console.log('list show\n', movieDetails.value)
            showModal.value = true
        }

        const closeMovieDetails = () => {
            console.log('modal close\n', movieDetails.value)
            showModal.value = false
        }

        return {
            go,
            showMovieDetails,
            closeMovieDetails,
            movieDetails,
            showModal,
        }
    }
}
</script>

<style>
.movies-list {
        margin-left: -1rem;
        margin-right: -1rem;
    }
</style>


  
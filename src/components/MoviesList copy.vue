<template>
    <section class="page-content page-movies-list">
        <!-- <h1 class="font-thin">{{ numberOfMovies }} Movies</h1> -->

        <!-- movie list header -->
        <div class="my-10 flex flex-nowrap justify-between items-center">
            <div>
                <div class="btn-group">
                    <button class="btn">Normal</button> 
                    <button class="btn">Normal</button> 
                    <button class="btn">Normal</button> 
                </div>
            </div>

            <div>
               <div class="dropdown  dropdown-end  dropdown-hover">
                    <div tabindex="0" class="m-1 btn">Sorting <vue-feather type="chevron-down" size="20" class="ml-2"></vue-feather></div> 
                    <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
                        <li><a>Latest added</a></li> 
                        <li><a>First added</a></li> 
                    </ul>
                    </div> 
            </div>
        </div>


        <!-- <div class="movies-list flex flex-wrap search-results" v-if="searchTerm">
            <div v-for="movie in filteredList" :key="movie.title" class="movie-list-item md:w-1/8 lg:w-1/4 xl:w-1/6 pb-8 px-4">
                <movie-card :movie="movie" />
            </div>
        </div> -->

        <div class="movies-list flex flex-wrap" v-if="!searchTerm">
            <div v-for="movie in movieList" :key="movie.title" class="movie-list-item pb-8 px-4 sm:w-1/3 md:w-1/8 lg:w-1/4 xl:w-1/6">
                <movie-card :movie="movie" />
            </div>
        </div>

    </section>
</template>

<script>
import MovieCard from './MovieCard.vue'
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'

export default {
    components: { MovieCard },
    props: ['moviesList'],
    name: 'MoviesList',

    setup(props) {
        // const store = useStore()

        // create simple array from props object
        //let movieList = Object.values(JSON.parse(JSON.stringify(props.moviesList)))

        // get movies from the store
        const movieListObj = computed(() => store.state.movies)

        // format to array of objects from firebase shit
        let movieList = Object.values(JSON.parse(JSON.stringify(movieListObj.value)))

        // the text of the search input
        let searchTerm = ref('')
        
        // the results array
        let filteredList = ref([])

        // total size of movies List
        let numberOfMovies = computed(() => {
            return movieList.length
        })

        // size of search result array
        let numberOfSearchResults = computed(() => {
            return filteredList.value.length
        })

        // basic filter 
        const filterMovies = (movies, term) => {
            return movies.filter((movie) => {
                return movie.Title.toLowerCase().indexOf(term.toLowerCase()) !== -1
            })
        }

        // watcher for search term
        watch(searchTerm, (newValue) => {
            filteredList.value = filterMovies(movieList, newValue)
        })

        return { 
            movieListObj,
            movieList, 
            numberOfMovies, 
            searchTerm, 
            filteredList, 
            numberOfSearchResults 
        }
    },
}

</script>

<style>
    .movies-list {
        margin-left: -1rem;
        margin-right: -1rem;;
    }

    .movies-list {}


</style>
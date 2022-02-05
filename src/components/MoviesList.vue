<template>
    <section class="page-content page-movies-list">
        <h1 class="font-thin">{{ numberOfMovies }} Movies</h1>

        <div class="mb-8">
            <input 
                v-model="searchTerm" 
                type="text" 
                class="input input-lg input-bordered w-full" 
                placeholder="search movie title..."
                >
        </div>

        <div class="my-10" v-if="searchTerm">
            <h2 class="font-thin">{{ numberOfSearchResults }} results for: <span class="font-bold">{{ searchTerm }}</span></h2> 
        </div>

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

        <div class="movies-list flex flex-wrap" v-if="searchTerm">
            <div v-for="movie in filteredList" :key="movie.title" class="movie-list-item lg:w-1/4 xl:w-1/6 pb-8 px-4">
                <movie-card :movie="movie" />
            </div>
        </div>

        <div class="movies-list flex flex-wrap" v-if="!searchTerm">
            <div v-for="movie in moviesList" :key="movie.title" class="movie-list-item lg:w-1/4 xl:w-1/6 pb-8 px-4">
                <movie-card :movie="movie" />
            </div>
        </div>

    </section>
</template>

<script>
import MovieCard from './MovieCard.vue'
import { ref, computed, watch } from 'vue'

export default {
    components: { MovieCard },
    props: ['moviesList'],
    name: 'MoviesList',

    setup(props) {
        // create simple array from props object
        let movieList = Object.values(JSON.parse(JSON.stringify(props.moviesList)))
        
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
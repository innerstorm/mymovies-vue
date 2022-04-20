<template>
    <section class="page-content movies-list">
        <h1 class="font-thin">{{ numberOfMovies }} Movies ({{ Math.floor(sumOfRuntime/60) }} hours)</h1>

        <!-- movie list header -->
        <!-- <div class="my-10 flex flex-nowrap justify-between items-center">
            <div>
                <div class="btn-group">
                    <button class="btn">1</button> 
                    <button class="btn">2</button> 
                    <button class="btn">3</button> 
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
        </div> -->

        <List :movies="movies" v-if="!searchTerm" />
        <List :movies="searchResults" v-else />
    </section>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import List from './List.vue'

export default {
    name: 'MoviesList',
    components: { List },

    setup() {
        const store = useStore()
        const movies = ref(store.state.movies)

        return {
            movies, 
            sumOfRuntime: computed(() => {
                return movies.value.reduce((sum, movie) => {
                    return sum + parseInt(movie.Runtime.replace(/\D/g, ''))
                }, 0)
            }),
            numberOfMovies: computed(() => movies.value.length),
            searchTerm: computed(() => store.state.searchTerm),
            searchResults: computed(() => store.state.searchResults),
        }
    }
}

</script>

<style>
    
</style>
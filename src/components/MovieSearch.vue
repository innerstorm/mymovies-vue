<template>
    <div class="container mx-auto page-content page-home">
        <div class="my-8">
            <div class="input-group">
                <input
                    v-model="searchTerm"
                    type="text"
                    autocomplete="false"
                    class="input-search input input-lg input-bordered w-full"
                    :class="dataIsLoading ? 'input-loading' : ''"
                    placeholder="search movie title..."
                />
                <button class="btn btn-lg btn-primary" @click="searchMovie">
                    Search Movies
                </button>
            </div>
        </div>

        <search-results
            :searchTerm="searchTerm"
            :newSearchResults="newSearchResults"
        ></search-results>

        <div class="my-10" v-if="searchTerm">
            <h2 class="font-thin">
                {{ numberOfSearchResults }} results for:
                <span class="font-bold">{{ searchTerm }}</span>
            </h2>
        </div>
    </div>
</template>

<script>
import { ref, watch, computed } from "vue";
import { useStore } from "vuex";
import List from "./List.vue";
import Searchresults from "./SearchResults.vue";

import { OMDB_API } from "../config/omdb";
import SearchResults from "./SearchResults.vue";

export default {
    components: { List, SearchResults },
    name: "MovieSearch",

    setup() {
        // init store
        const store = useStore();

        // content of the input box
        const searchTerm = ref(store.state.searchTerm);

        // new search results
        const newSearchResults = ref({});

        // loading state
        const dataIsLoading = ref(false);

        // current search page
        const currentSearchPage = ref(1);

        // select movies by title
        const filterMoviesByTitle = (movies, searchTerm) => {
            return movies.filter((movie) => {
                return movie.Title.toLowerCase().includes(
                    searchTerm.toLowerCase()
                );
            });
        };

        // watch search input
        watch(searchTerm, (newValue) => {
            store.commit("setSearchTerm", newValue);
            store.commit(
                "setSearchResults",
                filterMoviesByTitle(store.state.movies, newValue)
            );
        });

        watch(currentSearchPage, (newValue) => {
            console.log(newValue);
            searchMovie();
        });

        // get omdb data by movie title and page
        const fetchOMDB = async (searchTerm, page) => {
            //${omdb_api_url}?s=${q}&plot=short&type=movie&apikey=${omdb_api_key}
            const response = await fetch(
                `${OMDB_API.api_url}/?apikey=${OMDB_API.api_key}&s=${searchTerm}&page=${page}`
            );
            const data = await response.json();
            return data;
        };

        // search movie
        const searchMovie = () => {
            console.log("SEARCH: ", searchTerm.value);

            fetchOMDB(searchTerm.value, currentSearchPage.value).then(
                (data) => {
                    if (data.Response == "True") {
                        console.log("\n omdb DATA: ", data);

                        // we filter out the movies that already happen to be in the list
                        const filteredResults = data.Search.filter(
                            (movie) =>
                                !store.state.movies.find(
                                    (m) => m.imdbID == movie.imdbID
                                )
                        );
                        // update data
                        data.Search = filteredResults;

                        // update state
                        newSearchResults.value = data;
                    } else {
                        console.log("\nNO DATA");
                    }
                }
            );
        };

        return {
            dataIsLoading,
            searchTerm,
            searchMovie,
            numberOfSearchResults: computed(
                () => store.state.searchResults.length
            ),
            searchResults: computed(() => store.state.searchResults),
            newSearchResults,
            //closeSearchWindow,
            selectMovie: (movie) => {
                console.log(movie.Title);
                //store.commit('setSelectedMovie', movie)
                //router.push('/movie')
            },
        };
    },
};
</script>

<style scoped></style>

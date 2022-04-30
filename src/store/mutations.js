import { VuexPersistence } from "vuex-persist"

// local storage saves vuex state
export const vuexLocalStorage = new VuexPersistence({
    storage: window.localStorage
})

export default {    
    setUser(state, payload) {
        state.user = payload
    },
    setLoggedIn(state, payload) {
        state.isLoggedIn = payload
    },
    setFromLogin(state, payload) {
        state.fromLogin = payload
    },
    setMovies(state, payload) {
        state.movies = payload
    },
    setSearchResults(state, payload) {
        state.searchResults = payload
    },
    setSearchTerm(state, payload) {
        state.searchTerm = payload
    },
    selectMovie(state, payload) {
        state.selectedMovie = payload
    },

    RESTORE_MUTATION: vuexLocalStorage.RESTORE_MUTATION
}
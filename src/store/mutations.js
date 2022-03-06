import { VuexPersistence } from "vuex-persist"

// local storage saves vuex state
export const vuexLocalStorage = new VuexPersistence({
    storage: window.localStorage
})

export const mutations = {
    // set user object
    setUser(state, payload) {
        state.user = payload
    },
    setLoggedIn(state, payload) {
        state.isLoggedIn = payload
    },

    // set the data object
    setMovies(state, payload) {
        state.movies = payload
    },

    RESTORE_MUTATION: vuexLocalStorage.RESTORE_MUTATION
}
import { VuexPersistence } from "vuex-persist"

// local storage saves vuex state
export const vuexLocalStorage = new VuexPersistence({
    storage: window.localStorage
})

export default {    

    // set user object
    setUser(state, payload) {
        state.user = payload
    },
    setLoggedIn(state, payload) {
        state.isLoggedIn = payload
    },

    RESTORE_MUTATION: vuexLocalStorage.RESTORE_MUTATION
}
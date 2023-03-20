import { createStore } from "vuex"
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import { VuexPersistence } from "vuex-persist"

// local storage saves vuex state
export const vuexLocalStorage = new VuexPersistence({
    storage: window.localStorage
})

const store = createStore({
    // store states, as in user & movies
    state: {
        // user object
        user: {},
        
        // the datas
        movies: {},
        
        // search results
        searchResults: {},

        // the string of the searched movie
        searchTerm: '',

        // user's logged in state in store
        isLoggedIn: false,

        // coming from login or register
        fromLogin: false,
        
    },
    getters,
    actions,
    mutations,

    plugins: [vuexLocalStorage.plugin]
})

export default store

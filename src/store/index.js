import { createStore } from "vuex"
import mutations from './mutations'
import actions from './actions'
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
        movies: [],
        
        // user's logged in state in store
        isLoggedIn: false
    },

    actions,
    mutations,

    plugins: [vuexLocalStorage.plugin]
})

export default store

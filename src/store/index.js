import { createStore } from "vuex"
import { mutations, vuexLocalStorage } from './mutations'
import actions from './actions'

const store = createStore({
    // store states, as in user & movies
    state: {
        // user object
        user: {},
        
        // the data
        movies: [],
        
        // user's logged in state
        isLoggedIn: false
    },

    actions,
    mutations,

    plugins: [vuexLocalStorage.plugin]
})

export default store

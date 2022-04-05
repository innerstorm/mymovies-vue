import { createStore } from "vuex"
import mutations from './mutations'
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
})

export default store

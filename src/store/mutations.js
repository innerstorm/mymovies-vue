export default {    

    // set user object
    setUser(state, payload) {
        state.user = payload
    },
    setLoggedIn(state, payload) {
        state.isLoggedIn = payload
    }
}
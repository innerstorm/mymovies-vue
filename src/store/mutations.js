import { vuexfireMutations } from "vuexfire"

export default {
    ...vuexfireMutations,

    // set user object
    setUser(state, payload) {
        state.user = payload
    },
    setLoggedIn(state, payload) {
        state.isLoggedIn = payload
    }
}
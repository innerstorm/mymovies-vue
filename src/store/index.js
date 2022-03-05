import { createStore } from "vuex"
import { auth } from "../firebase/config"
import createPersistedState from "vuex-persistedstate"

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth"
import router from "../router"


const store = createStore({
    // store states, as in user & movies
    state: {
        // user object
        user: {},
        movies: {},
        isLoggedIn: false
    },

    mutations: {
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
        }
    },

    actions: {
        async userRegister(context, { email, password, name }) {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            if (response) {
                // TODO: need to add name and avatar

                //console.log(response)
                // await response.user.updateProfile({
                //     displayName: name,
                //     photoURL: getMyFancyGravatarURL(email)
                // })

                // sync user to store
                context.commit('setUser', response.user)
                context.commit('setLoggedIn', true)
            } else {
                throw new Error('signup failed')
            }
        },

        async userLogin(context, { email, password }) {
            const response = await signInWithEmailAndPassword(auth, email, password)

            if (response) {
                // sync user to store
                context.commit('setUser', response.user)
                context.commit('setLoggedIn', true)
            } else {
                throw new Error('login failed')
            }
        },

        async userLogout(context) {
            await signOut(auth)
            context.commit('setLoggedIn', false)
            context.commit('setUser', null)
            router.push('/login')
        }
    },

    plugins: [createPersistedState()]
})

export default store

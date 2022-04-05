import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from "firebase/auth"
import { firebaseAction } from "vuexfire"

import router from "../router"
import { getMyFancyGravatarURL } from "../functions"


export default {
    // create new user action
    userRegister(context, { email, password, username }) {
        // create user 
        createUserWithEmailAndPassword(auth, email, password)
        .then((newUser) => {
            // if user is created
            if (newUser) {
                // "update" newly created user with username and avatar
                updateProfile(auth.currentUser, {
                    displayName: username, 
                    photoURL: getMyFancyGravatarURL(email)
                })
                .then(() => { 
                    context.commit('setUser', newUser.user)
                    context.commit('setLoggedIn', true)
                    console.log('Profile updated!') 
                    
                })
                .catch((error) => { console.log('An error occured: ', error) });
            }

        }).catch((error) => {
            console.log('create user failed: ', error);
        })
    },

    // login user action
    async userLogin(context, { email, password }) {
        const loggedInUser = await signInWithEmailAndPassword(auth, email, password)

        if (loggedInUser) {
            // sync user to store
            context.commit('setUser', loggedInUser.user)
            context.commit('setLoggedIn', true)
            // get the data from firebase
        } else {
            throw new Error('login failed')
        }
    },

    // sign out user action
    async userLogout(context) {
        await signOut(auth)
        context.commit('setUser', {})
        context.commit('setMovies', {})
        context.commit('setLoggedIn', false)
        router.push('/login')
    },
 
}
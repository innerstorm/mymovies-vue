import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from "firebase/auth"

import { auth } from '../firebase/config'
import router from "../router"
import { getMyFancyGravatarURL } from "../functions"


import { getDatabase, ref, child, get } from "firebase/database";

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

    getMoviesSnapshot(context, userId) {

        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${userId}`)).then((snapshot) => {
          if (snapshot.exists()) {

            console.log(snapshot.val());
            context.commit('setMovies', snapshot.val())

          } else {

            console.log("No data available");
          }

        }).catch((e) => {
          console.log(e);
        });

    },
}
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from "firebase/auth"

import { auth } from '../firebase/config'
import router from "../router"

String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr   = this.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};
const getMyFancyGravatarURL = (emailToHash) => {
    // TODO: fallback
    return `https://www.gravatar.com/avatar/${emailToHash.hashCode().toString().toLowerCase()}?s=640&d=robohash`;
}


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
        
        } else {
            throw new Error('login failed')
        }
    },

    // sign out user action
    async userLogout(context) {
        await signOut(auth)
        context.commit('setUser', {})
        context.commit('setLoggedIn', false)
        router.push('/login')
    }
}
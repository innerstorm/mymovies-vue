import '../firebase/config'
import firebase from 'firebase'
import router from "../router"
import { getMyFancyGravatarURL } from "../functions"

export default {

    // create new user action
    userRegister(context, { email, password, username }) {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(credentials => {
                // get user info
                if (credentials) {
                    credentials.user.updateProfile({
                        displayName: username,
                        photoURL: getMyFancyGravatarURL(email)
                    })
                    .then(() => {
                        context.commit('setUser', credentials.user)
                        context.commit('setLoggedIn', true)
                        console.log('Profile updated!') 
                    })
                }
            })
            .catch(error => {
                // the fetch is nyeaaaah
                console.log(error)
            })
    },

    // login user action
    async userLogin(context, { email, password }) {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;

                // sync user to store
                context.commit('setUser', user)
                // change the store state
                context.commit('setLoggedIn', true)
                // ...

            })
            .catch((error) => {
                console.log(error)
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    },

    // sign out user action
    async userLogout(context) {
        firebase.auth().signOut()
        // TODO: maybe we can put it in a separate block
        context.commit('setUser', {})
        context.commit('setMovies', {})
        context.commit('setLoggedIn', false)
        context.commit('setFromLogin', false)
        router.push('/login')
    },

    selectMovie(movie) {
        console.log(movie.Title)
    }

 
}
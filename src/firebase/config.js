//Import the required methods
import { initializeApp } from 'firebase/app'
import 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { firebaseConfig } from './firebase.config'

//initialize the firebase app
const firebaseApp = initializeApp(firebaseConfig)

//initialize firebase auth
const auth = getAuth(firebaseApp)

// init database
const db = getDatabase(firebaseApp)

// //export the auth object
export { auth, db }
//Import the required methods
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase, ref, child, get } from 'firebase/database'
import { firebaseConfig } from './firebase.config'

//initialize the firebase app
const firebaseApp = initializeApp(firebaseConfig)

// db
const database = getDatabase(firebaseApp)

//initialize firebase auth
const auth = getAuth(firebaseApp)

//export the auth object
export { auth, database }
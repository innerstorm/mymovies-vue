import { auth, database } from './config'
import { onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, child, get } from "firebase/database";

class movieDataService {
    getAll() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const userId = auth.currentUser.uid;

                const dbRef = ref(database);

                get(child(dbRef, `users/${userId}`)).then((snapshot) => {
                
                    if (snapshot.exists()) {

                        console.log(snapshot.val());
                        //context.commit('setMovies', snapshot.val())

                    } else {

                        console.log("No data available");
                    }

                }).catch((e) => {
                    console.log(e);
                });


            } else {
                console.log('IS NOT')
            }
        })

        return false
    }

    add() {}

    update() {}

    delete() {}

    deleteAll() {}

}

export default movieDataService

<template>
    <div class="flex items-center justify-center h-screen">
        <div class="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-96">
            <div class="mb-4">
                <label class="block text-grey-darker text-sm font-bold mb-2" for="username">Email</label>
                <input v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username" type="text" placeholder="Username">
            </div>
            <div class="mb-6">
                <label class="block text-grey-darker text-sm font-bold mb-2" for="password">Password</label>
                <input v-model="password" class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="***">
            </div>
            <div class="flex items-center justify-between">
                <button @click="register" class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" type="button">Register</button>
            </div>
        </div>
    </div>

</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
        //username: "",
        email: "",
        password: "",
        error: null
    };
  },
  methods: {
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(data => {
        //   data.user
        //     .updateProfile({
        //       displayName: this.form.name
        //     })
        //     .then(() => {});
        console.log('success')
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>




// <script setup>
// import {ref} from 'vue'
// import * as firebase from 'firebase/app'
// import { useRouter } from 'vue-router'

// const router = useRouter()


// const email = ref('')
// const password = ref('')

// const register = () => {
//     firebase
//         .auth()
//         .createUserWithEmailAndPassword(email.value, password.value)
//         .then((data) => {
//             console.log('registerd')
//             router.push('/home')
//         })
//         .catch(e => {
//             console.error(e.code)
//             alert('Ho!')
//         })
// }
// </script>


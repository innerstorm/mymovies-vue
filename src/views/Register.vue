<template>
    <div class="flex items-center justify-center h-screen flex-col">
        <div class="p-6 card bg-base-200 w-96">
            <h1 class="text-2xl">Register</h1>

            <div 
              v-if="errorMessage"
              class="badge badge-error w-full py-5">
              {{ errorMessage }}
            </div>

            <div class="form-control mb-4">
                <label class="label" for="usermail">Email</label>
                <input 
                  v-model="email" 
                  class="input input-bordered" 
                  id="usermail" 
                  type="email" 
                  placeholder="Email"
                  :class="{'input-error': isErrorEmail}">
            </div>

            <div class="form-control mb-4">
                <label class="label" for="username">Username</label>
                <input 
                  v-model="username" 
                  class="input input-bordered" 
                  id="username" 
                  type="text" 
                  placeholder="nickname"
                  :class="{'input-error': isErrorName}">
            </div>

            <div class="form-control mb-6">
                <label class="label" for="password">Password</label>
                <input 
                  v-model="password" 
                  class="input input-bordered" 
                  id="password" 
                  type="password" 
                  placeholder="***"
                  :class="{'input-error': isErrorPassword}">
            </div>

            <div class="flex items-center justify-between">
                <button 
                  @click="register" 
                  class="btn btn-primary" 
                  :class="{ 'loading': isLoading }" 
                  type="button">
                    Register
                </button>
            </div>
        </div>

        <div class="mt-3">
            <router-link :to="{name: 'Login'}">Login</router-link>
        </div>
    </div>

</template>

<script>
import firebase from "firebase";

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
  data() {
    return {
        username: "",
        email: "",
        password: "",
        errorMessage: "",
        isErrorEmail: false,
        isErrorName: false,
        isErrorPassword: false,
        isLoading: false
    };
  },

  methods: {
    register() {
      this.isLoading = true
      this.isErrorEmail = false
      this.isErrorPassword = false
      this.isErrorName =  false

      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(data => {
          data.user
            .updateProfile({
              displayName: this.username,
              photoURL: getMyFancyGravatarURL(this.email)
            })
            .then(() => {
              console.log('register success\n', data)
              this.$router.push('/login')
            });
        })
        .catch(e => {
          this.isLoading = false
          
          switch (e.code) {
            case 'auth/invalid-email':
              this.errorMessage = 'Invalid email'
              this.isErrorEmail = true
              break
            case 'auth/network-request-failed':
              this.errorMessage = 'No network connection'
              break
            case 'auth/email-already-in-use':
              this.errorMessage = 'Email already in use'
              this.isErrorEmail = true
              break
            default:
              this.errorMessage = 'Email or password was incorrect'
              break
          }
          console.error(e.code)
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


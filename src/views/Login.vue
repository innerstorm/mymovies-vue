<template>
    <div class="flex items-center justify-center h-screen">
        <div class="p-6 card bg-base-200 w-96">
            <form @submit.prevent="userLogin">
                <h1 class="text-2xl">Log in</h1>
                <div 
                    v-if="errorMessage"
                    class="badge badge-error w-full py-5">
                    {{ errorMessage }}
                </div>

                <div class="form-control mb-4">
                    <label class="label" for="username">
                        <span class="label-text">Email</span>
                    </label>
                    <input 
                        v-model="email" 
                        class="input input-bordered" 
                        :class="{'input-error': isErrorEmail}"
                        id="username" 
                        type="text" 
                        placeholder="username">
                </div>
                <div class="mb-6 form-control">
                    <label class="label" for="password">
                        <span class="label-text">Password</span>
                    </label>
                    <input 
                        v-model="password" 
                        class="input input-bordered" 
                        :class="{'input-error': isErrorPassword}"
                        id="password" 
                        type="password" 
                        placeholder="password">
                </div>
                <div class="flex items-center justify-between">
                    <button class="btn btn-primary" :class="{ 'loading': isLoading }"  type="submit">Login</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {

    data() {
        return {
            email: '',
            password: '',
            errorMessage: '',
            isLoading: false,
            isErrorEmail: false,
            isErrorPassword: false,
        }
    },

    methods: {
        userLogin() {
            this.isLoading = true
            this.isErrorEmail = false
            this.isErrorPassword = false

            firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then( (data) => {
                    console.log('login successful\n', data)
                    this.$router.push('/dashboard')
                })
                .catch(e => {
                    this.isLoading = false
                    
                    switch (e.code) {
                        case 'auth/invalid-email':
                            this.errorMessage = 'Invalid email'
                            this.isErrorEmail = true
                            break
                        case 'auth/user-not-found':
                            this.errorMessage = 'No account with that email was found'
                            break
                        case 'auth/wrong-password':
                            this.errorMessage = 'Incorrect password'
                            this.isErrorPassword = true
                            break
                        default:
                            this.errorMessage = 'Email or password was incorrect'
                            break
                    }
                    console.error('ERROR: \n', e.message)
                })
        }
    }
}
</script>

<template>
    <div class="flex items-center justify-center h-screen flex-col">
        <div class="mb-24">
            <img src="../assets/logo.png" alt="" class="w-32">            
        </div>
        <div class="p-6 card bg-base-200 w-96 shadow-lg">
            <form @submit.prevent="handleSubmit">
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
                        placeholder="email">
                </div>
                <div class="mb-10 form-control">
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
                    <button 
                        class="btn btn-primary" 
                        :class="{ 'loading': isLoading }"  
                        type="submit">
                            Login
                    </button>
                </div>
            </form>
        </div>

        <div class="mt-5">
            <router-link :to="{name: 'Register'}">Register</router-link>
        </div>
        
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {

    setup() {
        const email = ref('')
        const password = ref('')
        const errorMessage = ref('')

        const store  = useStore()
        const router = useRouter()

        const isLoading = ref(false)

        const isErrorEmail = ref(false)
        const isErrorName = ref(false)
        const isErrorPassword = ref(false)

        const handleSubmit = async () => {
            isLoading.value = true
                
            try {
                await store.dispatch('userLogin', {
                    email: email.value,
                    password: password.value
                })
                console.log('login success')
                router.push('/dashboard')
            } 
            catch (e) {
                // handle error codes to write correct error messages
                console.log(e)

                isLoading.value = false
                    
                switch (e.code) {
                    case 'auth/invalid-email':
                        errorMessage.value = 'Invalid email'
                        isErrorEmail.value = true
                        break
                    case 'auth/user-not-found':
                        errorMessage.value = 'No account with that email was found'
                        break
                    case 'auth/wrong-password':
                        errorMessage.value = 'Incorrect password'
                        isErrorPassword.value = true
                        break
                    default:
                        errorMessage.value = 'Default error'
                        break
                }
                
            }
        }

        return {
            handleSubmit,
            email,
            password,
            isLoading,
            isErrorName,
            isErrorEmail,
            errorMessage,
            isErrorPassword,
        }
    }
}
</script>

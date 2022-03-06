<template>
    <div class="flex items-center justify-center h-screen flex-col">
        <div class="p-6 card bg-base-200 w-96">
            <form @submit.prevent="handleRegister">
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
                    placeholder="password"
                    :class="{'input-error': isErrorPassword}">
                </div>

                <div class="flex items-center justify-between">
                    <button 
                    class="btn btn-primary" 
                    :class="{ 'loading': isLoading }" 
                    type="submit">
                        Register
                    </button>
                </div>
            </form>
        </div>

        <div class="mt-3">
            <router-link :to="{name: 'Login'}">Login</router-link>
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
        const username = ref('')
        const errorMessage = ref('')
        
        const isErrorEmail = ref(false)
        const isErrorPassword = ref(false)
        const isErrorName = ref(false)
        
        const isLoading = ref(false)

        const store = useStore()
        const router = useRouter()

        const handleRegister = async () => {
            isLoading.value = true
            
            try {
                await store.dispatch('userRegister', {
                    email: email.value,
                    password: password.value,
                    username: username.value
                })
                router.push('/dashboard')
            }
            catch (e) {
                isLoading.value = false 
          
                switch (e.code) {
                    case 'auth/invalid-email':
                        errorMessage.value = 'Invalid email'
                        isErrorEmail.value = true
                        break
                    case 'auth/network-request-failed':
                        errorMessage.value = 'No network connection'
                        break
                    case 'auth/email-already-in-use':
                        errorMessage.value = 'Email already in use'
                        isErrorEmail.value = true
                        break
                    default:
                        errorMessage.value = 'Email or password was incorrect'
                        break
                }
                console.error(e.code)
            }
        }

        return {
            handleRegister,
            email,
            password,
            username,
            errorMessage,
            isErrorEmail,
            isErrorPassword,
            isErrorName,
            isLoading
        }
    }
}
</script>
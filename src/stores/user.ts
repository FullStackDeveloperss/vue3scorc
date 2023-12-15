import type { Form } from '@/types/general'
import type { User } from '@/types/user'
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
    'user',
    () => {
        const user = ref<User | null>(null)
        const loading = ref<boolean>(false)
        const status = ref<string>('')

        const login = async (data: Form): Promise<void> => {
            const { login, password } = data
            status.value = ''
            loading.value = true
            try {
                const res = await axios.post('auth/login', {
                    login,
                    password,
                })
                user.value = {
                    name: res.data.name,
                    email: res.data.email,
                    token: res.data.token,
                    userRole: res.data.role,
                    userName: res.data.name,
                }

                userName.value = res.data.name

                localStorage.setItem('token', user.value.token)
                localStorage.setItem('user', JSON.stringify(user.value))
                localStorage.setItem('userName', res.data.name)


                axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.value.token

                status.value = 'success'
            } catch (error) {
                status.value = 'error'
                user.value!.token = ''
            } finally {
                loading.value = false
            }
        }

        const logout = (): void => {
            status.value = ''
            user.value = null
            delete axios.defaults.headers.common['Authorization']
        }

        // TODO: username need only for document title, on change this method generate title remove username from this and ProfileData.vue
        const userName = ref<string | null>(null)
        const setUserName = name => {
            userName.value = name
            localStorage.setItem('userName', name)
        }

        return {
            user,
            userName,
            login,
            status,
            loading,
            logout,
            setUserName
        }
    },
    { persist: true },
)

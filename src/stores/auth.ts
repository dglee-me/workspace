import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
}

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(localStorage.getItem('isLoggedIn') === 'true')
  const user = ref<User | null>(
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null
  )

  const login = () => {
    // Mock login logic
    isLoggedIn.value = true
    const userData = {
      id: '1',
      name: '이동근',
      email: 'dglee@example.com',
      avatarUrl: 'https://github.com/shadcn.png'
    }
    user.value = userData
    
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    isLoggedIn.value = false
    user.value = null
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('user')
  }

  return {
    isLoggedIn,
    user,
    login,
    logout
  }
})

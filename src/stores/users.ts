import { defineStore } from 'pinia'
import type { NewUser } from '@/users'

function delay() {
  return new Promise<void>(resolve => setTimeout(resolve, 1500))
}

interface UsersState {
  currentUserId?: string
  loading: {
    authenticate: boolean
  }
}

export const useUsers = defineStore('users', {
  state: (): UsersState => ({
    currentUserId: undefined,
    loading: {
      authenticate: false,
    },
  }),

  actions: {
    async authenticate() {
      try {
        await delay()
        this.loading.authenticate = true
        const res = await window.fetch('/api/current-user', {
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const result = await res.json()
        this.currentUserId = result.id
      }
      catch (err) {
        this.currentUserId = undefined
      }
      finally {
        this.loading.authenticate = false
      }
    },

    async createUser(newUser: NewUser) {
      const body = JSON.stringify(newUser)

      await window.fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      })

      return this.authenticate()
    },

    async logout() {
      await window.fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return this.authenticate()
    },
  },
})

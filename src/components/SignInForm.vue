<script setup lang='ts'>
import { useUsers } from '@stores/users'
import UserForm from './UserForm.vue'
import { useModal } from '@/composables/modal'
import type { NewUser } from '@/users'

const usersStore = useUsers()
const modal = useModal()
const error = ref('')

async function handleSignIn(newUser: NewUser) {
  const body = JSON.stringify(newUser)
  const res = await window.fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })

  if ([401, 404].includes(res.status)) {
    error.value = 'Username or password is incorrect.'
  }
  else {
    usersStore.authenticate()
    modal.hideModal()
  }
}
</script>

<template>
  <UserForm :error="error" :show-validation="false" @submit="handleSignIn" />
</template>

<style>

</style>

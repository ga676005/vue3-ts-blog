<script setup lang='ts'>
import { useUsers } from '@stores/users'
import UserForm from './UserForm.vue'
import { useModal } from '@/composables/modal'
import type { NewUser } from '@/users'

const usersStore = useUsers()
const modal = useModal()

async function handleSubmit(newUser: NewUser) {
  await usersStore.createUser(newUser)
  modal.hideModal()
}
</script>

<template>
  <UserForm :show-validation="true" @submit="handleSubmit" />
</template>

<style>

</style>

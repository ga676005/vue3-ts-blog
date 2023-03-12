<script setup lang="ts">
import { useUsers } from '@stores/users'
import { useModal } from '@/composables/modal'

const modal = useModal()
const usersStore = useUsers()
const router = useRouter()

async function logout() {
  console.log('clicked!!!!!!!!!!!!')
  await usersStore.logout()
  console.log('logout usersStore.currentUserId', usersStore.currentUserId)

  router.push({ path: '/' })
}
</script>

<template>
  <div class="navbar">
    <div class="navbar-end">
      <div v-if="usersStore.currentUserId" class="buttons">
        <RouterLink
          class="button"
          data-testid="new-post"
          to="/posts/new"
        >
          New Post
        </RouterLink>
        <button
          class="button"
          data-testid="log-out"
          @click="logout"
        >
          Log Out
        </button>
      </div>
      <div v-else class="buttons">
        <button id="sign-up" class="button" @click="modal.showModal('signUp')">
          Sign Up
        </button>
        <button data-testid="sign-in" class="button" @click="modal.showModal('signIn')">
          Sign In
        </button>
      </div>
    </div>
  </div>

  <Teleport to="#modal">
    <component :is="modal.component.value" />
  </Teleport>
</template>

<style>

</style>

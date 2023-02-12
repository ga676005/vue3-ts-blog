<script setup lang="ts">
import { useModal } from '@/composables/modal'

const { showModal } = useModal()
</script>

<template>
  <div class="navbar">
    <div class="navbar-end">
      <div class="buttons">
        <button
          class="button"
          @click="showModal"
        >
          Sign Up
        </button>
        <RouterLink to="/posts/new" class="button">
          New Post
        </RouterLink>
      </div>
    </div>
  </div>

  <Teleport to="#modal">
    <SignupForm />
  </Teleport>
</template>

<style>

</style>

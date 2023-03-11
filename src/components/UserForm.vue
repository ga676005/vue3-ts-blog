<script setup lang="ts">
import { useUsers } from '@stores/users'
import { length, required, validate } from '@/validation'
import type { NewUser } from '@/users'
import { useModal } from '@/composables/modal'

const props = defineProps<{
  error?: string
  showValidation?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', payload: NewUser): void
}>()

const userStore = useUsers()
const modal = useModal()

const username = ref('')
const usernameStatus = computed(() => {
  if (props.showValidation)
    return validate(username.value, [required, length({ min: 5, max: 10 })])

  return { valid: true }
})

const password = ref('')
const passwordStatus = computed(() => {
  if (props.showValidation)
    return validate(password.value, [required, length({ min: 10, max: 40 })])

  return { valid: true }
})

const isInvalid = computed(() => {
  return (!usernameStatus.value.valid || !passwordStatus.value.valid)
})

async function handleSubmit() {
  if (isInvalid.value)
    return

  const newUser: NewUser = {
    username: username.value,
    password: password.value,
  }

  try {
    emit('submit', newUser)
  }
  catch (err) {
    console.log(err)
  }
}
</script>

<template>
  <form class="form" @submit.prevent="handleSubmit">
    <FormInput v-model="username" type="text" name="Username" :status="usernameStatus" />
    <FormInput v-model="password" type="password" name="Password" :status="passwordStatus" />
    <div v-if="props.error" class="is-danger help">
      {{ props.error }}
    </div>
    <button class="button" :disabled="isInvalid">
      Submit
    </button>
  </form>
</template>

<style scoped>
.form {
  background-color: white;
  padding: 30px;
  margin-top: 50px;
}
</style>

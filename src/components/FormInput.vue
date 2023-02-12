<script setup lang='ts'>
import type { Status } from '@/validation'

defineProps<{
  name: string
  modelValue: string
  status: Status
  type: string
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()

function handleInput(e: Event) {
  const value = (e.target as HTMLInputElement).value
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="field">
    <label :for="name" class="label"> {{ name }}</label>
    <div class="control">
      <input
        :id="name"
        :type="type"
        class="input"
        :value="modelValue"
        @input="handleInput"
      >
    </div>

    <p v-if="status.valid === false" class="is-danger help">
      {{ status.message }}
    </p>
  </div>
</template>

<style>

</style>

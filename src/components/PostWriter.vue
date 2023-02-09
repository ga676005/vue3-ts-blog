<script setup lang='ts'>
import type { TimelinePost } from '@/posts'

const props = defineProps<{
  post: TimelinePost
}>()

const title = ref(props.post.title)
</script>

<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">
          Post title
        </div>
        <input v-model="title" type="text" class="input">
        {{ title }}
      </div>
    </div>
  </div>
</template>

<style>

</style>

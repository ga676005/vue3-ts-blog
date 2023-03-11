<script setup lang='ts'>
import type { TimelinePost } from '../posts'

defineProps<{
  post: TimelinePost
}>()
</script>

<template>
  <RouterLink :to="`/posts/${post.id}`" class="panel-block is-flex is-flex-direction-column is-align-items-flex-start">
    <a href="">
      {{ post.title }}
    </a>
    <span>
      {{ post.created.toFormat("d MMM") }}
    </span>
  </RouterLink>
</template>

<style>

</style>

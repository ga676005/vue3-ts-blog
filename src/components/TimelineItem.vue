<script setup lang='ts'>
import type { TimelinePost } from '../posts'

defineProps<{
  post: TimelinePost
}>()
</script>

<template>
  <a class="panel-block is-flex is-flex-direction-column is-align-items-flex-start">
    <a href="">
      {{ post.title }}
    </a>
    <span>
      {{ post.created.toFormat("d MMM") }}
    </span>
  </a>
</template>

<style>

</style>

<script setup lang='ts'>
import { DateTime } from 'luxon'
import type { TimelinePost } from '@/posts'

const post: TimelinePost = {
  id: '-1',
  title: 'dodo',
  created: DateTime.now(),
}
</script>

<template>
  <PostWriter :post="post" />
</template>

<style>

</style>

<script setup lang='ts'>
import { DateTime } from 'luxon'
import { useUsers } from '@stores/users'
import { usePosts } from '@stores/posts'
import type { Post, TimelinePost } from '@/posts'

const userStore = useUsers()
const postsStore = usePosts()
const router = useRouter()

if (!userStore.currentUserId)
  throw new Error('User was not found')

const post: TimelinePost = {
  id: '-1',
  title: 'dodo',
  authorId: userStore.currentUserId,
  created: DateTime.now(),
  markdown: '## title',
  html: '<h2>title</h2>',
}

async function handleSubmit(post: Post) {
  await postsStore.createPost(post)
  router.push('/')
}
</script>

<template>
  New Post
  <PostWriter :post="post" @submit="handleSubmit" />
</template>

<style>

</style>

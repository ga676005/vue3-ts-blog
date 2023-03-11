<script setup lang='ts'>
import { usePosts } from '@stores/posts'
import type { Post } from '@/posts'

const route = useRoute()
const router = useRouter()
const postsStore = usePosts()
const id = route.params.id as string

const post = postsStore.all.get(id)
if (!post)
  throw new Error(`Post with id ${id} was not found`)

async function handleSubmit(post: Post) {
  await postsStore.updatePost(post)
  router.push('/')
}
</script>

<template>
  Edit Post
  <PostWriter :post="post" @submit="handleSubmit" />
</template>

<style>

</style>

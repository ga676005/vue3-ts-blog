<script setup lang='ts'>
import { marked } from 'marked'
import highlightjs from 'highlight.js'
import { debounce } from 'lodash'
import { usePosts } from '@stores/posts'
import type { TimelinePost } from '@/posts'
const props = defineProps<{
  post: TimelinePost
}>()

const posts = usePosts()
const router = useRouter()

const title = ref(props.post.title)
const content = ref(props.post.markdown)
const html = ref('')
const contentEditable = ref<HTMLDivElement>()

function parseHtml(markdown: string) {
  marked.parse(markdown, {
    gfm: true,
    breaks: true,
    highlight: (code) => {
      return highlightjs.highlightAuto(code).value
    },
  }, (err, parseResult) => {
    if (err)
      return

    html.value = parseResult
  })
}

watch(content, debounce((newContent) => {
  parseHtml(newContent)
}, 250), {
  immediate: true,
})

onMounted(() => {
  assert(contentEditable.value != null)

  contentEditable.value.innerText = content.value
})

function assert(condition: boolean): asserts condition {
  if (!condition)
    throw new Error('contentEditable DOM node was not found')
}

function handleInput() {
  assert(contentEditable.value != null)

  content.value = contentEditable.value.innerText
}

async function handleClick() {
  const newPost: TimelinePost = {
    ...props.post,
    title: title.value,
    markdown: content.value,
    html: html.value,
  }
  await posts.createPost(newPost)
  router.push('/')
}
</script>

<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">
          Post title
          <input v-model="title" type="text" class="input">
        </div>
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <div
        ref="contentEditable"
        contenteditable
        @input="handleInput"
      />
    </div>
    <div class="column" v-html="html" />
  </div>

  <div class="columns">
    <div class="column">
      <button class="button is-primary is-pulled-right" @click="handleClick">
        Save Post
      </button>
    </div>
  </div>
</template>

<style>

</style>

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import { usePosts } from '@stores/posts'
import { useUsers } from '@stores/users'
import App from './App.vue'
import { router } from './router'

const app = createApp(App)
app.use(createPinia())

// useStores should come after createPinia()
const postStore = usePosts()
const userStore = useUsers()

// handle race condition
Promise.all([
  userStore.authenticate(),
  postStore.fetchPosts(),
]).then(() => {
  app.use(router)
  app.mount('#app')
})

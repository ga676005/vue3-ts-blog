import { useUsers } from '@stores/users'
import { createRouter, createWebHistory } from 'vue-router'
import EditPost from './views/EditPost.vue'
import HomeVue from './views/Home.vue'
import NewPostVue from './views/NewPost.vue'
import ShowPost from './views/ShowPost.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomeVue,
    },
    {
      path: '/posts/new',
      component: NewPostVue,
      beforeEnter: () => {
        const userStore = useUsers()
        if (userStore.currentUserId == null) {
          return {
            path: '/',
          }
        }
      },
    },
    {
      path: '/posts/:id',
      component: ShowPost,
    },
    {
      path: '/posts/:id/edit',
      component: EditPost,
    },
  ],
})

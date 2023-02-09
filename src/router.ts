import { createRouter, createWebHistory } from 'vue-router'
import HomeVue from './views/Home.vue'
import NewPostVue from './views/NewPost.vue'

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
    },
  ],
})

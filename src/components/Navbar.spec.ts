import { mount } from '@vue/test-utils'
import type { Pinia } from 'pinia'
import { createPinia, setActivePinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
import { useUsers } from '@stores/users'
import type { Router } from 'express'
import { routes } from '@/router'
import Navbar from '@/components/Navbar.vue'

vi.stubGlobal('fetch', vi.fn(() => {
// ...
}))

describe('Navbar', () => {
  let pinia: Pinia
  let router: Router

  beforeEach(() => {
    const el = document.createElement('div')
    el.id = 'modal'
    document.body.appendChild(el)

    pinia = createPinia()
    setActivePinia(pinia)
    router = createRouter({
      history: createMemoryHistory(),
      routes,
    })
  })

  it('renders signin and signup buttons when not authenticated', () => {
    const wrapper = mount(Navbar, {
      global: {
        plugins: [pinia, router],
      },
    })

    expect(wrapper.find('#sign-up').exists()).toBe(true)
    expect(wrapper.find('[data-testid="sign-in"]').exists()).toBe(true)
  })

  it.only('renders new post and logout buttons when authenticated', async () => {
    const userStore = useUsers()
    userStore.currentUserId = '1'

    const wrapper = mount(Navbar, {
      global: {
        plugins: [pinia, router],
      },
    })

    function delay() {
      return new Promise<void>(resolve => setTimeout(resolve, 1500))
    }

    expect(wrapper.find('[data-testid="new-post"]').text()).toBe('New Post')
    expect(wrapper.find('[data-testid="log-out"]').text()).toBe('Log Out')
    console.log(wrapper.find('[data-testid="log-out"]').element)

    await wrapper.find('[data-testid="log-out"]').trigger('click')
    await delay()
    console.log(wrapper.html())

    expect(wrapper.find('#sign-up').exists()).toBe(true)
    expect(wrapper.find('[data-testid="sign-in"]').exists()).toBe(true)
  })
})

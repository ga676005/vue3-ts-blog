import SignInForm from '@components/SignInForm.vue'
import SignupForm from '@components/SignupForm.vue'

const show = ref(false)
const component = shallowRef()

export function useModal() {
  return {
    show,
    component,
    showModal: (type: 'signUp' | 'signIn') => {
      switch (type) {
        case 'signUp':
          component.value = SignupForm
          break
        case 'signIn':
          component.value = SignInForm
          break
      }
      show.value = true
    },
    hideModal: () => show.value = false,
  }
}

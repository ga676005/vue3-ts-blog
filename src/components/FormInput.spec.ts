import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import FormInput from './FormInput.vue'

describe('FormInput', () => {
  it('tests validation', async () => {
    const Parent = defineComponent({
      components: { FormInput },
      setup() {
        const formValue = ref('foo')
        const status = computed(() => {
          if (formValue.value.length > 5) {
            return {
              valid: true,
            }
          }
          else {
            return {
              valid: false,
              message: 'error',
            }
          }
        })

        return { formValue, status }
      },
      template: `
        <FormInput
          name="foo"
          type="input"
          :status="status"
          v-model="formValue"
        />
      `,
    })

    const wrapper = mount(Parent)

    expect(wrapper.find('.is-danger').text()).toBe('error')

    await wrapper.find('input').setValue('foobar')

    expect(wrapper.find('.is-danger').exists()).toBe(false)
  })

  it('renders some errors', () => {
    const wrapper = mount(FormInput, {
      props: {
        name: 'foo',
        modelValue: 'bar',
        status: {
          valid: false,
          message: 'error',
        },
        type: 'input',
      },
    })

    expect(wrapper.find('.is-danger').exists()).toBe(true)
  })

  it('renders no errors', () => {
    const wrapper = mount(FormInput, {
      props: {
        name: 'foo',
        modelValue: 'bar',
        status: {
          valid: true,
          message: 'error',
        },
        type: 'input',
      },
    })

    expect(wrapper.find('.is-danger').exists()).toBe(false)
  })
})

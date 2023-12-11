import { mount } from "@vue/test-utils";
import { describe, test, expect } from "vitest";
import NotificationToast from '@/components/NotificationToast.vue'

describe('Notification Component', () => {
  test('renders the correct style for error', () => {
    const status = 'error'
    const wrapper = mount(NotificationToast, {
      props: { status }
    })
    // expect(wrapper.classes()).toEqual(expect.arrayContaining(['notification--error']))
    expect(wrapper.html()).toMatchSnapshot()
    // expect(wrapper.html()).toMatchInlineSnapshot(`
    //   "<div role="alert" class="notification notification--error">
    //     <p class="notification__text"></p><button title="close" class="notification__button"> ✕ </button>
    //   </div>"
    // `)
  })
  test('renders the correct style for success', () => {
    const status = 'success'
    const wrapper = mount(NotificationToast, {
      props: { status }
    })
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['notification--success']))
  })
  test('renders the correct style for info', () => {
    const status = 'info'
    const wrapper = mount(NotificationToast, {
      props: { status }
    })
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['notification--info']))
  })
  test('notification slides up when message is empty', () => {
    const message = ''
    const wrapper = mount(NotificationToast, {
      props: { message }
    })
    expect(wrapper.classes('notification--slide')).toBe(false)
  })
  test('emits event when close btn is clicked', async () => {
    const wrapper = mount(NotificationToast)
    const closeBtn = wrapper.find('button')
    await closeBtn.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('clear-notification')
  })
  test('renders correct message to viewer', () => {
    const message = 'Someting happened, try again'
    const wrpper = mount(NotificationToast, {
      props: { message }
    })
    expect(wrpper.find('.notification__text').text()).toBe(message)
  })
})
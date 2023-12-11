import { mount } from "@vue/test-utils"
import PostCard2 from '@/components/PostCard2.vue'

describe('Post Card Component', () => {
  test('created posts render correctly', () => {
    const title = 'Test Post'
    const body = 'test post body'
    const wrapper = mount(PostCard2, {
      props: { title, body }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
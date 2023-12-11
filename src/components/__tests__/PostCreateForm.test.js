import axios from "axios";
import { mount, flushPromises } from "@vue/test-utils";

import PostCreateForm from '@/components/PostCreateForm.vue'

const mockPost = {
  userId: 1,
  id: 1,
  title: 'Post Title 1',
  body: 'Simple post body...'
}

describe('Post Create Form', () => {
  test('user can create a new post', async () => {
    vi.spyOn(axios, 'post').mockResolvedValueOnce({
      data: mockPost
    })

    const wrapper = mount(PostCreateForm)

    await wrapper.find('[data-testid="title-input"]').setValue(mockPost.title)
    await wrapper.find('[data-testid="body-input"]').setValue(mockPost.body)
    await wrapper.find('[data-testid="post-form"]').trigger('submit')

    expect(wrapper.find('[type="submit"]').html()).toContain('Creating...')

    await flushPromises()

    expect(wrapper.html()).toContain(mockPost.title)
    expect(wrapper.html()).toContain(mockPost.body)
  })

  // second group of tests
  describe('user get notified', () => {
    test('when attempting to create a post with imcomplete fields', async () => {
      const wrapper = mount(PostCreateForm)

      //try to submit the form with empty fields
      await wrapper.find('[data-testid="post-form"]').trigger("submit")

      expect(wrapper.html()).toContain('Please input post title')

      //click the close button
      await wrapper.find('[data-testid="close-notification"]').trigger("click")

      //assert that the error message is no longer on screen
      expect(wrapper.html()).not.toContain('Please input post title')

      await wrapper.find('[data-testid="title-input"]').setValue(mockPost.title)
      await wrapper.find('[data-testid="post-form"]').trigger("submit")
      expect(wrapper.html()).toContain('Please input post body')
    })

    test('when creating a new post fails', async () => {
      vi.spyOn(axios, "post").mockRejectedValueOnce(new Error('Error occured'))

      const wrapper = mount(PostCreateForm)

      await wrapper.find('[data-testid="title-input"]').setValue(mockPost.title)
      await wrapper.find('[data-testid="body-input"]').setValue(mockPost.body)
      await wrapper.find('[data-testid="post-form"]').trigger('submit')

      expect(wrapper.find('[type="submit"]').html()).toContain('Creating...')

      await flushPromises()

      expect(wrapper.html()).toContain('Error occured')
    })
  })
})
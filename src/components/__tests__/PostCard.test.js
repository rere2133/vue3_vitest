import axios from "axios";
import { flushPromises, mount } from "@vue/test-utils";
import PostCard from '@/components/PostCard.vue'

const mockPost = {
  userId: 1,
  id: 1,
  title: 'Post Title 1',
  body: 'Simple post body...'
}
describe('Post Carrd Component', () => {
  test('can fetch and display a post', async () => {
    // 模擬 axios 的 get 方法，返回模擬文章對象
    vi.spyOn(axios, "get").mockResolvedValueOnce({
      data: mockPost
    })
    const wrapper = mount(PostCard)
    expect(wrapper.html()).toContain('Loading...')

    // 確保所有異步操作已完成
    await flushPromises()

    expect(wrapper.find("[data-testid='post-title']").text()).toBe(mockPost.title)
    expect(wrapper.find("[data-testid='post-body']").text()).toBe(mockPost.body)
  })
  test('can display an error message if fetching a post fails', async () => {
    // 模擬 axios 的 get 方法，以拒絕 Promise 並返回一個錯誤
    vi.spyOn(axios, 'get').mockRejectedValueOnce(new Error('Error occured'))

    const wrapper = mount(PostCard)

    expect(wrapper.html()).toContain('Loading...')

    await flushPromises()

    expect(wrapper.find("[data-testid='error-message']").text()).toBe('Error occured')
  })
})
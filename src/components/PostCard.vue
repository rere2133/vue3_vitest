<template>
  <div>
    <div v-if="post">
      <h1 data-testid="post-title">{{ post.title }}</h1>
      <p data-testid="post-body">{{ post.body }}</p>
    </div>
    <p v-if="loading" data-testid="loader">Loading...</p>
    <p v-if="error" data-testid="error-message">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const post = ref<Post | null>(null);
const loading = ref(true);
const error = ref(null);

const fetchPost = async () => {
  try {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    post.value = data;
  } catch (err: any) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchPost();
});
</script>

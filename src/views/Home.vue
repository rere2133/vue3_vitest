<template>
  <div>
    <h1 class="text-5xl">Home Page</h1>
    <!-- <HelloWorld msg="Vite + Vue" />
    <NotificationToast
      status="success"
      :message="message"
      @clear-notification="clearNotification"
    />
    <PostCard /> -->
    <PostCreateForm />
  </div>
</template>

<script setup lang="ts">
// import HelloWorld from "@/components/HelloWorld.vue";
// import NotificationToast from "@/components/NotificationToast.vue";
// import PostCard from "@/components/PostCard.vue";
// import { ref } from "vue";
import PostCreateForm from "@/components/PostCreateForm.vue";

// const message = ref("image uploaded successfully");
// const clearNotification = () => {
//   message.value = "";
// };
</script>

<style scoped></style>

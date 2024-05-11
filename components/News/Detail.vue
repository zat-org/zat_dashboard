<template>
  <div v-if =selected_news.data.value >
    
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ id: string }>();
const newsApi = useNews();
const selected_news = await newsApi.getSingleNews(props.id);
if (selected_news.status.value == "error") {
  if (selected_news.error.value?.statusCode == 404) {
    navigateTo("/news");
  }
}
</script>

<style></style>

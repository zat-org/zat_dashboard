<template>
  <div class="flex flex-col gap-5">
    <h1 class="text-2xl text-primary font-semibold">
      <span
        class="hover:text-gray-500 duration-300 text-2xl text-primary font-bold"
        @click="navigateTo('/news')"
        >الاخبار</span
      >
      / اضافة خبر
    </h1>
    <NewsAdd />
  </div>
</template>

<script lang="ts" setup></script>

<style></style>

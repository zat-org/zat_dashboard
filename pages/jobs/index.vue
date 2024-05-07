<template>
  <div class="flex flex-col h-full gap-10 py-2 px-4">
    <UCard :ui="{base:'flex flex-col h-full',body:{base:'grow'}}">
      <template #header>
        <h1 class="text-3xl text-primary">الوظائف</h1>
      </template>
      <JobList />
      <template #footer>
        <div>
          <UButton
            @click="navigateTo('/jobs/add')"
            icon="i-heroicons-plus-20-solid"
            trailing
            >اضافة وظيفة
          </UButton>
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>

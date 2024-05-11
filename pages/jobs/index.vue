<template>
  <div class="flex flex-col h-full gap-5  py-2 px-4">

    <h1 class="text-3xl text-primary font-semibold mx-5 ">الوظائف</h1>
    <UCard :ui="{base:'flex flex-col h-full',background:'bg-transparent',body:{base:'grow'}}">
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

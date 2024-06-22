<template>
  <UCard>
<UTable :rows="getAllTeamsREQ.data.value?.  data" />

    <template #footer>
      <UButton>add </UButton>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
const teamApi = useTeam();
const getAllTeamsREQ = await teamApi.getAllTeams();
</script>

<style></style>

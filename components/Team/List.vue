<template>
  <UCard>
    <div class="flex flex-col gap-5">
      <div class="flex gap-5 items-center">
        <UFormGroup class="grow">
          <UInput v-model="name_Q" placeholder="الاسم"
        /></UFormGroup>
        <UFormGroup label="ذات">
          <UToggle v-model="zat_Q" />
        </UFormGroup>
      </div>
      <!-- {{ Filterzat }} -->
      <UTable :rows="Filterzat" :columns="columns" @select="onSelect" >
        <template #name-data="{ row }">
          <div class="flex items-center gap-5">
            <UAvatar size="xl" :src="row.logoUrl" />
            <h2 calss="text-xl ">{{ row.name }}</h2>
          </div>
        </template>
        <template #isZatTeam-data="{ row }">
          <UBadge :color="row.isZatTeam ? 'green' : 'red'">
            <UIcon
              class="text-2xl"
              :name="
                row.isZatTeam
                  ? 'material-symbols:done'
                  : 'streamline:delete-1-solid'
              " />
          </UBadge>
        </template>
        <template #establishmentDateUtc-data="{ row }">
          {{ new Date(row.establishmentDateUtc).toLocaleDateString("ar") }}
        </template>
      </UTable>
    </div>

    <template #footer>
      <UButton to="/team/add" icon="material-symbols:add">اضافة  </UButton>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
import type { TeamI } from '~/models/team';

const teamApi = useTeam();
const getAllTeamsREQ = await teamApi.getAllTeams();
const columns = [
  { key: "name", label: "الاسم" },
  { key: "isZatTeam", label: "ذات" },
  { key: "establishmentDateUtc", label: "الانشاء" },
];
const teams = computed(() => {
  return getAllTeamsREQ.data.value?.data;
});

const name_Q = ref();
const Filtername = computed(() => {
  if (!name_Q.value) {
    return teams.value ?? [];
  } else {
    return (
      teams.value?.filter((t) => {
        return t.name.includes(name_Q.value);
      }) ?? []
    );
  }
});

const zat_Q = ref<boolean>(true);
const Filterzat = computed(() => {
  // console.log(zat_Q.value)
  // console.log(Filtername.value)
  return (
    Filtername.value?.filter((t) => {
      return t.isZatTeam == zat_Q.value;
    }) ?? []
  );
});

const onSelect = (row: TeamI) => {
  return navigateTo(`/team/${row.id}`)
};


</script>

<style></style>

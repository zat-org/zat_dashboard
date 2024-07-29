<template>
  <UCard>
    <div class="flex items-center gap-3">
      <UFormGroup class="grow">
        <UInput placeholder="البحث بالاسم " v-model="q_name" />
      </UFormGroup>
      <!-- {{ players }} -->

      <UFormGroup label="indep">
        <UToggle v-model="freeplayer" lable="test player" />
      </UFormGroup>
    </div>

    <UTable
      class="basis-[40vh] grow"
      :rows="rows"
      :columns="columns"
      :loading="Players.pending.value"
      @select="onSelect">
      <template #name-data="{ row }">
        <div class="flex gap-3 items-center">
          <UAvatar :src="row.imageUrl" size="md" />
          <span class="font-bold">{{ row.name }}</span>
        </div>
      </template>
    </UTable>
    <UPagination
      v-model="page"
      :page-count="pageCount"
      :total="allPlayers.length"
      class="self-center place-self-end" />
    <template #footer>
      <UButton @click="navigateTo('/player/add')" icon="i-mdi-account-add">
        اضافه</UButton
      >
    </template>
  </UCard>
</template>

<script lang="ts" setup>
const q_name = ref();
const q_role = ref<number[]>([]);

const PlayerApi = usePlayer();
const gamePersonApi =useGameperson() 
const freeplayer = ref(true);
const Players = await gamePersonApi.getAllGamePerson(freeplayer);
const columns = [
  { key: "name", label: " الاسم" },
  { key: "actions", label: "" },
];
const page = ref(1);
const pageCount = 5;
const allPlayers = computed(() => {
  return Players.data.value?.data!;
});
const players = PlayerApi.players;
const onSelect = (row: any) => {
  // console.log(row)
  return navigateTo(`player/${row.id}`);
};
const nameFilter = computed(() => {
  if (!q_name.value) {
    return allPlayers.value;
  } else {
    return allPlayers.value.filter((p) => {
      return p.name.includes(q_name.value);
    });
  }
});

const rows = computed(() => {
  return nameFilter.value.slice(
    (page.value - 1) * pageCount,
    page.value * pageCount
  );
});
</script>

<style></style>

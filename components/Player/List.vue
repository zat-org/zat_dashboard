<template>
  <UCard>
    <div class="flex items-center gap-3">
      <UFormGroup class="grow">
        <UInput placeholder="البحث بالاسم " v-model="q_name" />
      </UFormGroup>
      <!-- {{ players }} -->
      <UFormGroup class="w-[100px]">
        <USelectMenu placeholder="اختر الفئة"
          v-model="q_role"
          :options="players"
          multiple
          option-attribute="name"
          value-attribute="role" />
      </UFormGroup>
      <UFormGroup label="indep">
        <UToggle v-model="freeplayer" lable="test player" />
      </UFormGroup>
    </div>
    <UTable
      class="grow"
      :rows="rows"
      :columns="columns"
      :loading="Players.pending.value"
      @select="onSelect">
      <template #name-data="{ row }">
        <div class="flex gap-3 items-center">
          <UAvatar :src="row.imageUrl" size="xl" />
          <span class="font-bold">{{ row.name }}</span>
        </div>
      </template>
      <template #roles-data="{ row }">
        <div class="flex gap-5">
          <UBadge
            v-for="splayer in players.filter((player=>{return row.roles.map((roleobj:any)=>{return roleobj?.role}).includes(player.role)}))">
            {{ splayer.name }}
          </UBadge>
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

const freeplayer = ref(true);
const Players = await PlayerApi.getAllPlayers(freeplayer);
const columns = [
  { key: "name", label: " الاسم" },
  { key: "roles", label: "الفئة" },
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
const roleFilter = computed(() => {
  if (!q_role.value) {
    return nameFilter.value;
  } else {
    if (q_role.value.length > 0) {
      console.log(q_role.value);
      return nameFilter.value.filter((p) => {
        return p.roles.some((r) => q_role.value.includes(r.role));
      });
    } else {
      return nameFilter.value;
    }
  }
});
const rows = computed(() => {

  return roleFilter.value.slice(
    (page.value - 1) * pageCount,
    page.value * pageCount
  );
});
</script> 

<style></style>

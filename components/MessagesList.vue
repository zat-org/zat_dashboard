<template>
  <!-- form has 2 filter text name and email    and select for types  -->
  <div class="flex flex-col gap-2">
    <UForm
      :state="state"
      :schema="schema"
      class="flex gap-2 justify-around items-center">
      <UFormGroup name="name_email" class="grow">
        <UInput v-model="state.name_email" placeholder=" الاسم او الايميل" />
      </UFormGroup>

      <UFormGroup class="w-36" name="type">
        <USelectMenu
          v-model="state.type"
          :options="types"
          option-attribute="name"
          value-attribute="id"
          multiple
          placeholder="النوع" />
      </UFormGroup>
      
      <UToggle
        v-model="handel"
        color="lime"
        size="xl"
        on-icon="i-heroicons-document-check-16-solid"
        off-icon="i-heroicons-document-check-16-solid" />

   
      <UToggle
        v-model="archive"
        color="amber"
        size="xl"
        on-icon="i-heroicons-archive-box-20-solid"
        off-icon="i-heroicons-archive-box-20-solid" />
    </UForm>
    <UTable
      class="grow overflow-auto h-0"
      :rows="filter_type"
      :columns="columns"
      :loading="messages.pending.value"
      @select="onSelect">
      <template #name-data="{ row }">
        <div class="flex justify-start items-center gap-2">
          <UIcon
            v-if="row.isHandled"
            name="i-heroicons-document-check-16-solid"
            class="text-lime-400 text-2xl" />
          <UIcon
            v-if="row.isArchived"
            name="i-heroicons-archive-box-20-solid"
            class="text-amber-400 text-2xl" />
          <p>
            {{ row.name }}
          </p>
        </div>
      </template>
      <template #type-data="{ row }">
        <UBadge :color="MessageColor[row.type]">{{
          MessageType[row.type]
        }}</UBadge>
      </template>
      <template #content-data="{ row }">
        <p>
          {{
            row.content.lenght <= 20
              ? row.content
              : row.content.substring(0, 20)
          }}{{ row.content.lenght <= 20 ? "" : "..." }}
        </p>
      </template>
    </UTable>
    <!-- <UPagination v-model="pagenumber" :page-count="5" /> -->
  </div>
  <!-- <div class="p-2 bg-lime-500 rounded-xl">

  </div> -->
</template>
<!-- TODO handel note in list -->

<script lang="ts" setup>
import {
  MessageType,
  MessageColor,
  types,
  type IMessage,
} from "~/models/message";
import { object, string, number, array } from "yup";

const messageApi = useContactUsMessage();
const state = reactive<{ name_email: string; type: number[] }>({
  name_email: "",
  type: [],
});
const schema = object({
  name_email: string(),
  type: array().of(number()),
});
const filter_name_email = computed(() => {
  if (!state.name_email) {
    return messages.data.value?.data;
  }
  return messages.data.value?.data.filter((message) => {
    return (
      message.email
        .toLowerCase()
        .includes(state.name_email.toString().toLowerCase()) ||
      message.name
        .toLowerCase()
        .includes(state.name_email.toString().toLowerCase())
    );
  });
});
const filter_type = computed(() => {
  if (state.type.length == 0) {
    return filter_name_email.value;
  }
  return filter_name_email.value?.filter((message) => {
    return state.type.includes(message.type);
  });
});
const handel = ref<boolean>(true);
const archive = ref<boolean>(false);
const pagenumber = ref<number>(1);

const messages = await messageApi.getAllMessages(handel, archive, pagenumber);
console.log(messages.data);
const columns = [
  {
    key: "name",
    label: "الاسم",
  },
  { key: "email", label: " البريد الالكتروني" },
  { key: "content", label: "  المحتوي" },

  {
    key: "type",
    label: "النوع",
  },
];
const router = useRouter();
const onSelect = (row: IMessage) => {
  // router.push(`row.id`)
  return navigateTo(`/messages/${row.id}`);
};
</script>

<style scoped></style>

<template>
  <!-- form has 2 filter text name and email    and select for types  -->
  <div class="flex flex-col gap-2">
    <UForm :state="state" :schema="schema" class="flex gap-2 justify-around items-center">
      <UFormGroup name="name_email" class="grow">
        <UInput v-model="state.name_email" />
      </UFormGroup>

      <UFormGroup class="w-36" name="type">
        <USelectMenu
          v-model="state.type"
          :options="types"
          option-attribute="name"
          value-attribute="id"
          multiple />
      </UFormGroup>
    </UForm>
    <UTable
      :rows="filter_type"
      :columns="columns"
      :loading="messages.pending.value"
      @select="onSelect">
      <template #type-data="{ row }">
        <UBadge :color="MessageColor[row.type]">{{
          MessageType[row.type]
        }}</UBadge>
      </template>
    </UTable>
  </div>
  <!-- <div class="p-2 bg-lime-500 rounded-xl">

  </div> -->
</template>

<script lang="ts" setup>
import { MessageType, MessageColor, types, type IMessage } from "~/models/message";
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

const messages = await messageApi.getAllMessages();

const columns = [
  {
    key: "name",
    label: "الاسم",
  },
  { key: "email", label: " البريد الالكتروني" },
  {
    key: "type",
    label: "النوع",
  },
];
const router =useRouter()
const onSelect = (row:IMessage)=>{
  // router.push(`row.id`)
return navigateTo(`/messages/${row.id}`)
}
</script>

<style scoped></style>

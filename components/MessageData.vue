<template>
  <UCard
    v-if="message.data.value"
    :ui="{
      base: 'flex flex-col',
      background: 'bg-white dark:bg-[#121212]/50 ',
      body: { base: 'grow flex' },
    }"
    class="grow">
    <template #header>
      <div class="flex justify-between gap-5">
        <h2>{{ message.data.value.data.name }}</h2>
        <UBadge size="lg" :color="MessageColor[message.data.value.data.type]">{{
          MessageType[message.data.value.data.type]
        }}</UBadge>
      </div>
    </template>
    <div class="flex grow gap-3">
      <div class="space-y-3 grow">
        <h2 class="text-2xl grow text-primary font-semibold w-2/3">محتوي</h2>
        <p class="overflow-y-auto grow">
          {{ message.data.value.data.content }}
        </p>
      </div>
      <div class="flex flex-col gap-3 overflow-auto grow">
        <h2 class="text-2xl text-primary font-semibold">الملاحظات</h2>
        <div
          class="overflow-y-auto grow"
          :innerHTML="message.data.value.data.notes"></div>
        <div class="flex justify-between  gap-5">
          <UTextarea v-model="notes" class="grow"> </UTextarea>
          <UButton
            label="اضافة تعليق"
            @click="updatenotes"
            :loading="update_notes.status.value == 'pending'" />
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-between gap-5">
        <div class="flex gap-2">
          <UButton @click="$router.back()" color="gray">عودة</UButton>
          <a
            :href="'mailto:' + message.data.value.data.email"
            class="hover:bg-primary hover:text-black rounded-xl p-2 duration-300">
             الميل
          </a>
        </div>
        <div class="flex gap-2">
          <UButton
            @click="Handel"
            :color="message.data.value.data.isHandled ? 'red' : 'primary'"
            :label="
              message.data.value.data.isHandled ? 'الغاء الحل' : 'تم الحل'
            "></UButton>
          <UButton
            @click="Archive"
            :color="message.data.value.data.isArchived ? 'red' : 'yellow'"
            :label="
              message.data.value.data.isArchived
                ? 'الغاء الارشفة'
                : 'نقل الي  الارشيف'
            "></UButton>
        </div>
      </div>
    </template>
  </UCard>
</template>
<!-- TODO handel note message and add comment  -->
<script lang="ts" setup>
// import { UTextarea } from "#build/components";
import { MessageColor, MessageType } from "~/models/message";
import { useAuthStore } from "~/store/auth";
const props = defineProps<{ id: string }>();
const userStore = useAuthStore();

const router = useRouter();
if (!props.id) {
  navigateTo("/messages");
}
const messageApi = useContactUsMessage();
const message = await messageApi.getSingleMessage(props.id);
const notes = ref<string>();
if (message.error.value) {
  switch (message.error.value.statusCode) {
    case 404:
      router.push("/messages");
      break;
  }
}

const update_notes = await messageApi.updateNotes(message.data);
const updatenotes = async () => {
  if (notes.value) {
    if (message.data.value) {
      if (message.data.value.data.notes == null) {
        message.data.value.data.notes = "";
      }
      message.data.value.data.notes += `( ${userStore.name}) : ${notes.value}  <br/> `;
      await update_notes.execute();
      notes.value = "";
    }
  }
};
const archiveMessage = await messageApi.archiveMessage(message.data);
const handelMessage = await messageApi.handelMessage(message.data);

const Archive = async () => {
  await archiveMessage.execute();
  notes.value = "";
  // console.log('archive',archiveMessage.data)
};
const Handel = async () => {
  await handelMessage.execute();
  notes.value = "";
  // console.log('handel',handelMessage.data)
};
</script>

<style></style>

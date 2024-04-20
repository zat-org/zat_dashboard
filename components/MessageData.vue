<template>
  <div v-if="message.data.value" class="flex flex-col h-5/6 mx-5 self-center">
    <UCard
      :ui="{
        base: 'flex flex-col',
        background: 'bg-white dark:bg-[#121212]/50 ',
        body: { base: 'grow' },
      }"
      class="grow">
      <template #header>
        <div class="flex justify-between gap-5">
          <h2>{{ message.data.value.data.name }}</h2>
          <UBadge
            size="lg"
            :color="MessageColor[message.data.value.data.type]"
            >{{ MessageType[message.data.value.data.type] }}</UBadge
          >
        </div>
      </template>
      <div calss="flex flex-col justify-center mx-6 ">
        {{ message.data.value.data.content }}
      </div>
      <template #footer>
        <div class="flex justify-between gap-5">
          <div class="flex gap-2">
            <UButton @click="$router.back()" color="gray">عودة</UButton>
            <a
              :href="'mailto:' + message.data.value.data.email"
              class="hover:bg-primary hover:text-black rounded-xl p-2 duration-300">
              ارسل له علي الميل
            </a>
          </div>
          <div class="flex gap-2">
            <UButton
              @click="() => Handel(!message.data.value?.data.isHandled)"
              :color="message.data.value.data.isHandled ? 'red' : 'primary'"
              :label="
                message.data.value.data.isHandled
                  ? 'الغاء الحل'
                  : 'تم الحل'
              "></UButton>
            <UButton
              @click="() => Archive(!message.data.value?.data.isArchived)"
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
  </div>
</template>

<script lang="ts" setup>
import { MessageColor, MessageType } from "~/models/message";
const props = defineProps<{ id: string }>();
const router = useRouter();
if (!props.id) {
  navigateTo("/messages");
}
const messageApi = useContactUsMessage();
const message = await messageApi.getSingleMessage(props.id);

if (message.error.value) {
  switch (message.error.value.statusCode) {
    case 404:
      router.push("/messages");
      break;
  }
}
const archiveStatus = ref<boolean>(true);
const handelStatus = ref<boolean>(true);

const archiveMessage = await messageApi.archiveMessage(
  message.data.value?.data!,
  archiveStatus
);
const handelMessage = await messageApi.handelMessage(
  message.data.value?.data!,
  handelStatus
);

const Archive = async (status: boolean) => {
  archiveStatus.value = status;
  await archiveMessage.execute();
  // console.log(archiveMessage);
};
const Handel = async (status: boolean) => {
  handelStatus.value = status;

  await handelMessage.execute();
  // console.log(handelMessage);
};
</script>

<style></style>

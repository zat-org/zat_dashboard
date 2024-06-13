<template>
  <div class="flex w-full gap-5 h-full justify-between p-5">
    <UForm
      class="grow h-full"
      :schema="schema"
      :state="state"
      @submit="onSubmit">
      <UCard
        :ui="{
          base: 'flex flex-col justify-center h-full overflow-auto',
          body: { base: 'grow flex ' },
        }">
        <template #header>
          <div class="flex gap-2">
            <span
              class="text-2xl text-primary font-bold cursor-pointer hover:text-gray-700 duration-300"
              @click="navigateTo('/jobs')">
              الوظائف /
            </span>
            <h1
              v-if="editmode == true"
              class="text-2xl text-primary font-semibold">
              التعديل علي عرض لوظيفه
            </h1>
            <h1
              v-if="editmode == false"
              class="text-2xl text-primary font-semibold">
              انشاء عرض وظيفه جديد
            </h1>
          </div>
        </template>
        <div class="grow transition-all duration-300">
          <UFormGroup label="الوظيفه" name="position" size="lg">
            <UInput v-model="state.position" />
          </UFormGroup>
          <TiptapEditor v-model="data_quill" />
          {{ data_quill }}
          <!-- {{ md_test}} -->

       

          <UFormGroup label="الملخص" name="brief" size="lg">
            <UTextarea v-model="state.brief" resize />
          </UFormGroup>
          <div class="flex justify-stretch items-stretch gap-5">
            <UFormGroup
              label="المسؤليات"
              name="responsibilities"
              class="grow"
              size="lg">
              <UTextarea v-model="state.responsibilities" resize />
            </UFormGroup>
            <UFormGroup
              label="المتطلبات"
              name="requirements"
              class="grow"
              size="lg">
              <UTextarea v-model="state.requirements" resize />
            </UFormGroup>
          </div>
          <div class="flex justify-stretch items-stretch gap-5">
            <UFormGroup
              label="اوقات العمل"
              name="workHoursTypes"
              size="lg"
              class="grow">
              <UTextarea v-model="state.workHoursTypes" resize />
            </UFormGroup>
            <UFormGroup label="الموقع" name="location" size="lg" class="grow">
              <UTextarea v-model="state.location" />
            </UFormGroup>
          </div>
        </div>
        <template #footer>
          <div class="flex justify-between gap-5 items-center overflow-auto">
            <UButton
              icon="i-heroicons-check-20-solid"
              trailing
              color="green"
              type="submit"
              :loading="
                add_new_job.status.value == 'pending' ||
                update_job.status.value == 'pending'
              "
              label=" حفظ" />

            <UButton
              @click="preview = !preview"
              :icon="preview ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
              trailing
              :label="preview ? 'اخفاء' : 'اظهار'" />
          </div>
        </template>
      </UCard>
    </UForm>
    <!-- preivew mode -->
    <UCard
      class="overflow-auto grow prose prose-stone dark:prose-invert transition-all duration-300 ease-in-out"
      :class="{ hidden: !preview, 'w-full': preview }">
      <h4>الوظيفه</h4>
      <p>{{ state.position }}</p>
      <h4>ملخص</h4>
      <p>{{ state.brief }}</p>
      <MDC :value="data" />
    </UCard>
  </div>
</template>

<script lang="ts" setup>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
// import  TurndownService from 'turndown'

// const turndownService = new TurndownService()
// const md_test =computed(()=>{
//   return  turndownService.turndown(data_quill.value)
// })
const data_quill = ref("");
// this component has 2 mode add and update
import { object, string, array, number } from "yup";
import { type IJobs } from "~/models/jobs";
import { parseMarkdown } from "@nuxtjs/mdc/runtime";
// import TiptapEditor from "../tiptapEditor.vue";
const preview = ref<boolean>(false);
const jobApi = useJobAd();
const route = useRoute();
const props = defineProps<{ editmode: boolean }>();
const schema = object({
  position: string().required(),
  brief: string().required(),
  responsibilities: string().required(),
  requirements: string().required(),
  workHoursTypes: string().required(),
  location: string().required(),
});

const state = reactive<Omit<IJobs, "id" | "createdSince">>({
  position: "",
  brief: "",
  responsibilities: "",
  requirements: "",
  workHoursTypes: "",
  location: "",
});
if (props.editmode == true) {
  if (route.params.id) {
    const s_job = await jobApi.getJob(route.params.id as string);
    if (s_job.data.value) {
      state.brief = s_job.data.value.data.brief;
      state.location = s_job.data.value.data.location;
      state.position = s_job.data.value.data.position;
      state.requirements = s_job.data.value.data.requirements;
      state.responsibilities = s_job.data.value.data.responsibilities;
      state.workHoursTypes = s_job.data.value.data.workHoursTypes;
    }
  }
}

const data = computed(async () => {
  const data = [
    " #### المسؤليات ",
    state.responsibilities,
    " #### المتطلبات",
    state.requirements,
    " ####  اوقات العمل",
    state.workHoursTypes,
    " #### الموقع",
    state.location,
  ].join("\n");
  const ast = await parseMarkdown(data);
  return ast;
});

const add_new_job = await jobApi.addJobAd(state);
const update_job = await jobApi.updateJob(route.params.id as string, state);
const onSubmit = async () => {
  if (props.editmode == false) {
    await add_new_job.execute();
    if (add_new_job.status.value == "success") {
      navigateTo(`/jobs/${add_new_job.data.value?.data.id}`);
    } else if (add_new_job.status.value == "error") {
    }
  } else {
    await update_job.execute();
    if (update_job.status.value == "success") {
      navigateTo(`/jobs/${update_job.data.value?.data.id}`);
    } else if (update_job.status.value == "error") {
    }
  }
};
</script>

<style>
UFormGroup {
  padding: 2px;
}
</style>

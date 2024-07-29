<template>
  <UForm
    :schema="schema"
    :state="state"
    class="flex grow flex-col space-y-4"
    @submit="onSubmit">
    <UCard>
      <UFormGroup label="الاسم" name="name">
        <UInput v-model="state.name" />
      </UFormGroup>
      <div class="flex justify-between">
        <div class="flex flex-col gap-5 w-1/2">
          <UFormGroup label="الصورة" name="imageUrl">
            <UInput
              ref="image"
              v-model="state.Image"
              type="file"
              @change="onChange"
              accept="image/png, image/gif, image/jpeg" />
          </UFormGroup>

          <img
            v-if="image_url || state.Image"
            :src="image_url"
            class="h-[200px] w-[200px] rounded-2xl" />
        </div>
        <UFormGroup label="  تاريخ بداء التحكيم" name="startOfficiantingOn">
          <VDatePicker
            dir="rtl"
            v-model="state.startOfficiantingOn"
            mode="date"
            locale="ar"
            :is-dark="true">
          </VDatePicker>
          <!-- <UInput v-model="state.startOfficiantingOn" type="image" /> -->
        </UFormGroup>
      </div>

      <template #footer>
        <div class="flex justify-between gap-5">
          <UButton color="gray" @click="navigateTo('/officiant')">
            عودة
          </UButton>

          <UButton type="submit"> اضافة </UButton>
        </div>
      </template>
    </UCard>
  </UForm>
</template>

<script lang="ts" setup>
import type { Reactive } from "vue";
import { object, string, date, array } from "yup";
import type {
  officiantCreate,
  officiantI,
  officiantUpdate,
} from "~/models/Officaint";
const props = defineProps<{ id?: string }>();
const officaintApi = useOfficiant();

const editmode = computed(() => {
  return props.id ? true : false;
});

// setup modal and toast
const toast = useToast();
//satrt  image handel
const image = ref();
const image_url = ref();

const selectedOfficiant = reactive<officiantI>({
  id: "",
  name: "",
  imageUrl: "",
  startOfficiantingOn: "",
});
if (editmode.value && props.id) {
  const getREQ = await officaintApi.getOfficiantbyid(props.id);
  if (getREQ.status.value == "success") {
    Object.assign(selectedOfficiant, getREQ.data.value?.data);
    image_url.value = selectedOfficiant.imageUrl;
  } else if (getREQ.status.value == "error") {
    toast.add({ title: "حدث خطاء ما في استرجاع البيانات " });
    navigateTo("/officiant");
  }
}

const onChange = () => {
  const image_input = image.value.input as HTMLInputElement;
  if (image_input.files && image_input.files.length > 0) {
    const image_flie = image_input.files[0];
    var reader = new FileReader();
    reader.onload = function () {
      image_url.value = reader.result;
    };
    reader.readAsDataURL(image_flie);
  } else {
    image_url.value = "";
  }
};
let schema = object({});
if (editmode.value) {
  schema = object({
    name: string().required(),
    Image: string(),
    startOfficiantingOn: date().required(),
  });
} else {
  schema = object({
    name: string().required(),
    Image: string().required(),
    startOfficiantingOn: date().required(),
  });
}
let state: Reactive<officiantCreate | officiantUpdate>;
if (editmode.value) {
  state = reactive<officiantUpdate>({});
  state.name = selectedOfficiant.name;
  //  state.Image=selectedOfficiant.imageUrl
  state.startOfficiantingOn = selectedOfficiant.startOfficiantingOn;
} else {
  state = reactive<officiantCreate>({
    name: editmode.value ? selectedOfficiant.name : "",
    Image: "",
    startOfficiantingOn: editmode.value
      ? new Date(selectedOfficiant.startOfficiantingOn)
      : new Date(),
  });
}
const addREQ = await officaintApi.createOfficiant();

const updateREQ = await officaintApi.updateOfficiant();

const onSubmit = async () => {
  if (editmode.value) {
    const image_input = image.value.input as HTMLInputElement;
    let image_file: File | undefined = undefined;
    if (image_input.files && image_input.files.length > 0) {
      image_file = image_input.files[0];
    }
    if (props.id) await updateREQ.fetchREQ(state, props.id, image_file);
    if (updateREQ.status.value == "success") {
      toast.add({ title: "update  officiant done" });
      return navigateTo(`/officiant/${props.id}`);
    } else if (updateREQ.status.value == "error") {
      toast.add({ title: "update  officiant hass error" });
    }
  } else {
    const image_input = image.value.input as HTMLInputElement;
    if (image_input.files && image_input.files.length > 0) {
      const image_flie = image_input.files[0];
      await addREQ.fetchREQ(state as Reactive<officiantCreate>, image_flie);
      if (addREQ.status.value == "success") {
        toast.add({ title: "add officaint is done " });
        return navigateTo("/officiant");
      } else if (addREQ.status.value == "error") {
        toast.add({ title: "add officaint is has error " });
      }
    }
  }
};
// end form date
</script>

<style></style>

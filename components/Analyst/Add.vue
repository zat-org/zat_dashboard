<template>
  <UForm
    :state="state"
    :schema="schema"
    @submit="onSubmit"
    class="flex flex-col grow">
    <UCard>
      <div class="flex gap-5">
        <UFormGroup label="name" name="fullName" class="w-1/2">
          <UInput v-model="state.fullName" />
        </UFormGroup>

        <div class="flex flex-col gap-3 w-1/2 justify-center items-center">
          <UFormGroup label="image" name="Image" class="w-full">
            <UInput
              type="file"
              v-model="state.Image"
              ref="image"
              @change="onChange" />
          </UFormGroup>
          <img v-if="image_url" :src="image_url" class="w-full rounded-2xl" />
        </div>
      </div>
      <template #footer>
        <div class= " flex justify-between">
          <UButton
            type="button"
            label="back"
            color="gray"
            @click="navigateTo('/analyst')" />

          <UButton
            type="submit"
            label="add"
            :loading="AddREQ.status.value == 'pending'" />
        </div>
      </template>
    </UCard>
  </UForm>
</template>

<script lang="ts" setup>
import { object, string } from "yup";
import type { createAnalyst, updateAnalyst } from "~/models/Analyst";
const toast = useToast();
const props = defineProps<{ id?: string }>();
const editmode = computed(() => {
  return props.id ? true : false;
});
const getREQ = await useAnalyst().getAnalysByID();
if (editmode.value) {
  await getREQ.fetchREQ(props.id!);
  if (getREQ.status.value == "error") {
    toast.add({ title: "error in retrive analyst" });
    navigateTo("/analyst");
  }
}
const image = ref();
const image_url = ref();
let schema = object({});
if (editmode.value) {
  schema = object({
    fullName: string().required(),
    Image: string(),
  });
  image_url.value = getREQ.data.value?.data.imageUrl;
} else {
  schema = object({
    fullName: string().required(),
    Image: string().required(),
  });
}
const state = reactive<createAnalyst>({
  fullName: editmode ? getREQ.data.value?.data.fullName! : "",
  Image: "",
});
const AddREQ = await useAnalyst().creaetAnalyst();
const updateREQ = await useAnalyst().updateAnalyst();
const onSubmit = async () => {
  if (!editmode.value) {
    const image_input = image.value.input as HTMLInputElement;
    if (image_input.files && image_input.files.length > 0) {
      const imageFile = image_input.files[0];
      let new_analyst: createAnalyst = {
        fullName: state.fullName,
        Image: imageFile,
      };
      await AddREQ.fetchREQ(new_analyst, imageFile);
      if (AddREQ.status.value == "success") {
        toast.add({ title: "new Analyst add done " });
        return navigateTo("/analyst");
      } else if ((AddREQ.status.value = "error")) {
        toast.add({ title: "new Analyst Hass Error " });
      }
    }
  } else {
    let imageFile;

    const image_input = image.value.input as HTMLInputElement;
    if (image_input.files && image_input.files.length > 0) {
      imageFile = image_input.files[0];
    }
    let new_analyst: updateAnalyst = {
      fullName: state.fullName,
    };

   await  updateREQ.fetchREQ(new_analyst, props.id!, imageFile);
   if (updateREQ.status.value=="success"){
    toast.add({title:"updated Done successfuly"})
    return navigateTo('/analyst')
  }else if(updateREQ.status.value=="error"){
    toast.add({title:"updated has error"})
   }
  }
};
const onChange = async () => {
  const image_input = image.value.input as HTMLInputElement;
  if (image_input.files && image_input.files.length > 0) {
    const imageFile = image_input.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      image_url.value = reader.result;
    };
    reader.readAsDataURL(imageFile);
  } else {
    image_url.value = "";
  }
};
</script>

<style></style>

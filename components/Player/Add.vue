<template>
  <UForm :state="state" :schema="schema" @submit="onSubmit" class="flex grow">
    <UCard class="w-10/12">
      <!-- name and roles -->

      <div class="flex flex-col gap-5">
        <UFormGroup label="الاسم" name="name">
          <UInput v-model="state.name" />
        </UFormGroup>
        <div class="flex gap-5 justify-between">
          <div class="flex flex-col  gap-3 w-1/2">
            <div class="flex flex-row gap-5  justify-center">
              <UFormGroup label="الصورة" name="imageUrl" class="grow">
                <UInput
                  ref="image"
                  type="file"
                  accept="image/png, image/jpg, image/jpeg"
                  v-model="state.imageUrl"
                  @change="onChange" />
              </UFormGroup>
            </div>
            <img
              class="h-[30vh]"
              :src="image_url || state.imageUrl"
              v-if="image_url || state.imageUrl" />
            <!-- <UAvatar
           /> -->
          </div>

          <!-- social media part -->
          <div class="flex flex-col gap-3 w-1/2">
            <div class="flex items-center gap-5">
              <UButton
                @click="state.socialMedia.push({ name: '', url: '', icon: '' })"
                icon="i-mdi-add">
                روابط التوصل</UButton
              >
              <UButton to="https://icon-sets.iconify.design/" target="_blank">
                اختر الايقونة</UButton
              >
            </div>
            <div class="basis-[30vh] flex-shrink  overflow-y-scroll">
              <div
                v-for="(sm, index) in state.socialMedia"
                class="flex flex-col gap-5 ">
                <div class="flex gap-3 ">
                  <UFormGroup
                    label="الاسم"
                    :name="'socialMedia[' + index + '].name'">
                    <UInput v-model="sm.name" />
                  </UFormGroup>
                  <UFormGroup
                    label="الايقونه"
                    :name="'socialMedia[' + index + '].icon'"
                    class="grow">
                    <UInput v-model="sm.icon" />
                  </UFormGroup>
                  <UFormGroup
                    label="الرابط"
                    :name="'socialMedia[' + index + '].url'"
                    class="grow">
                    <UInput v-model="sm.url" />
                  </UFormGroup>
                  <div class="self-center ">
                    <UButton
                      icon="i-mdi-delete"
                      v-if="index > 0"
                      color="red"
                      @click="state.socialMedia.splice(index, 1)">
                      مسح
                    </UButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end social media part -->
      <!-- role paert  -->

      <!-- end role paert  -->

      <template #footer>
        <div class="flex justify-between">
          <UButton color="gray" @click="navigateTo('/player')"> عوده </UButton>
          <UButton
            type="submit"
            :loading="
              addREQ.status.value == 'pending' ||
              uploadREQ.status.value == 'pending'
            ">
            {{ editmode ? "تعديل" : "اضافة" }}
          </UButton>
        </div>
      </template>
    </UCard>
  </UForm>
</template>

<script lang="ts" setup>
import { array, object, string, number } from "yup";
import type { CreatePlayer } from "~/models/player";
const props = defineProps<{ id?: string }>();

const image_url = ref();
const imageApi = useImage();
const uploadREQ = await imageApi.upload_image();
const image = ref();

const editmode = computed(() => {
  return !(props.id === undefined);
});
const playerAPi = usePlayer();
const getPlayer = await playerAPi.getPlayerByID();

const socialMediaSchema = object({
  name: string().required("this field is required"),
  url: string()
    .matches(
      /^(https?:\/\/)?((([a-zA-Z\d]([a-zA-Z\d-]*[a-zA-Z\d])*)\.)+[a-zA-Z]{2,}|\d{1,3}(\.\d{1,3}){3}|(\[(?:[a-fA-F\d]{1,4}:){7}[a-fA-F\d]{1,4}\]))(:\d+)?(\/[-a-zA-Z\d%_.~+]*)*(\?[;&a-zA-Z\d%_.~+=-]*)?(#[a-zA-Z\d_-]*)?$/i,
      "this not valid link"
    )
    .required("this field is required"),
  icon: string().required("this field is required"),
});

let schema = object({});
if (editmode.value) {
  if (props.id) await getPlayer.fetchREQ(props.id);
  if (getPlayer.status.value == "success") {
    image_url.value = getPlayer.data.value?.data.imageUrl;

    schema = object({
      name: string().required(),
      imageUrl: string(),
      socialMedia: array().of(socialMediaSchema),
    });
  }
} else {
  schema = object({
    name: string().required(),
    imageUrl: string().required(),
    socialMedia: array().of(socialMediaSchema),
  });
}

const onUpload = async () => {
  const image_input = image.value.input as HTMLInputElement;
  if (image_input.files && image_input.files.length > 0) {
    console.log("startupload");
    const image_file = image_input.files[0];
    await uploadREQ.fetchRequest(image_file);
    if (uploadREQ.status.value == "success") {
      console.log(uploadREQ.data.value?.data.url);
      image_url.value = uploadREQ.data.value?.data.url;
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
  uploadREQ.status.value = "idle";
};

const state = reactive<CreatePlayer>({
  name:
    getPlayer.status.value == "success" ? getPlayer.data.value?.data.name! : "",
  imageUrl: "",
  // getPlayer.status.value == 'success'?getPlayer.data.value?.data.imageUrl:""
  socialMedia:
    getPlayer.status.value == "success"
      ? getPlayer.data.value?.data.socialMedia!
      : [{ name: "", url: "", icon: "" }],
});
const updateREQ = await playerAPi.updatePlayer();
const addREQ = await playerAPi.addPlayer();


const onSubmit = async () => {
  if (editmode.value) {
    // want to check if new image selected
    if (
      (image.value as HTMLInputElement).files &&
      (image.value as HTMLInputElement).files?.length! > 0
    ) {
      await onUpload();
    }

    await updateREQ.fetchRequest(
      state,
      getPlayer.data.value?.data.imageUrl!,
      image_url.value,
      props.id!
    );
    if (addREQ.status.value == "success") {
      useToast().add({ title: "تم تعديل الاعب بنجاح" });
      return navigateTo("/player");
    } else if (addREQ.status.value == "error") {
      useToast().add({ title: "حدث خطاء في تعديل الاعب " });
    }
  } else {
    await onUpload();
    await addREQ.fetchRequest(state, image_url.value);
    if (addREQ.status.value == "success") {
      useToast().add({ title: "تم اضافة الاعب بنجاح" });
     return  navigateTo("/player");
    } else if (addREQ.status.value == "error") {
      useToast().add({ title: "حدث خطاء في اضافة الاعب " });
    }
  }
};
</script>

<style scooped>
UInput {
  @apply py-5;
}
</style>

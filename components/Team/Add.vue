<template>
  <UForm class="flex grow" :state="state" :schema="schema" @submit="onSubmit">
    <UCard>
      <div class="flex flex-col gap-3">
        <div class="flex gap-5">
          <UFormGroup label="الاسم" name="name" class="grow">
            <UInput v-model="state.name" />
          </UFormGroup>
          <UFormGroup label="من فرق ذات" name="isZatTeam">
            <UToggle v-model="state.isZatTeam" />
          </UFormGroup>
        </div>
        <div class="flex justify-between gap-5">
          <UFormGroup label="الوجو" name="logoUrl">
            <UInput
              ref="imageInput"
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              @change="onChange"
              v-model="state.logoUrl" />
          </UFormGroup>

          <img
            v-if="imageUrl"
            class="basis-[200px] w-[200px] rounded"
            :src="imageUrl" />
        </div>
      </div>

      <template #footer>
        <div class="flex items-center justify-between gap-5">
          <UButton @click="navigateTo('/team')" color="gray">عوده</UButton>
          <UButton
            type="submit"
            :loading="
              uploadreq.status.value == 'pending' ||
              addTeamREQ.status.value == 'pending'
            "
            :label="editmode?'edit':'اضافه'"
            ></UButton
          >
        </div>
      </template>
    </UCard>
  </UForm>
</template>

<script lang="ts" setup>
import { array, object, string, number, boolean } from "yup";
import type { AddTeamI } from "~/models/team";
const teamApi = useTeam();

const imageUrl = ref();

const toast = useToast();
const props = defineProps<{ id?: string }>();
const editmode = computed(() => {
  return !(props.id === undefined);
});

const getREQ = await teamApi.getSingleTeam();
if (editmode.value && props.id) {
  await getREQ.fetchREQ(props.id);
  if (getREQ.status.value == "error") {
    toast.add({ title: " هذا الفريق غير موجود" });
    navigateTo("/team");
  } else if (getREQ.status.value == "success") {
    imageUrl.value = getREQ.data.value?.data.logoUrl;
  }
}
let schema = object({});

if (editmode.value) {
  schema = object({
    name: string().required(),
    logoUrl: string(),
    isZatTeam: boolean().required(),
  });
} else {
  schema = object({
    name: string().required(),
    logoUrl: string().required(),
    isZatTeam: boolean().required(),
  });
}

const state = reactive<AddTeamI>({
  name: editmode.value ? getREQ.data.value?.data.name! : "",
  logoUrl: "",
  isZatTeam: editmode.value ? getREQ.data.value?.data.isZatTeam! : false,
});
const updateREQ = await teamApi.updateTeam();
const addTeamREQ = await teamApi.addTeam();
const onSubmit = async () => {
  if (editmode.value) {
    //  update
    const image_input = imageInput.value.input as HTMLInputElement;
    if (image_input.files && image_input.files.length > 0) {
      await onUpload();
    }
    if (
      uploadreq.status.value == "success" ||
      uploadreq.status.value == "idle"
    ) {
    }
    await updateREQ.fetchREQ(
      state,
      imageUrl.value,
      getREQ.data.value?.data.logoUrl!,
      getREQ.data.value?.data.id!
    );
    if (updateREQ.status.value == "success") {
      toast.add({ title: "update done" });
      return navigateTo("/team");
    } else if (updateREQ.status.value == "error") {
      toast.add({ title: "update failed" });
    }
  } else {
    // add
    await onUpload();
    if (uploadreq.status.value == "success") {
      await addTeamREQ.fetchREQ(state, imageUrl.value);
      if (addTeamREQ.status.value == "success") {
        toast.add({ title: "تم اضافة الفريق بنجاح" });
        return navigateTo("/team");
      }
    }
  }
};
const imageInput = ref();

const onChange = async () => {
  const image_input = imageInput.value.input as HTMLInputElement;

  if (image_input.files && image_input.files.length > 0) {
    const imageFile = image_input.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      imageUrl.value = reader.result;
    };
    reader.readAsDataURL(imageFile);
  } else {
    imageUrl.value = "";
  }
};
const imageAPi = useImage();

const uploadreq = await imageAPi.upload_image();
const onUpload = async () => {
  // hit end point upload image
  const image_input = imageInput.value.input as HTMLInputElement;
  if (image_input.files && image_input.files.length > 0) {
    const imageFile = image_input.files[0];
    await uploadreq.fetchRequest(imageFile);
    if (uploadreq.status.value == "success") {
      imageUrl.value = uploadreq.data.value?.data.url;
    } else if (uploadreq.status.value == "error") {
      toast.add({ title: "  حدث خطاء ما في تحميل الصوره" });
    }
  }
};
</script>

<style></style>

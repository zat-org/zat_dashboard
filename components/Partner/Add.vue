<template>
  <UForm :state="state" :schema="schema" @submit="onSubmit">
    <UCard>
      <UFormGroup label="الاسم" name="name">
        <UInput v-model="state.name" />
      </UFormGroup>
      <UFormGroup label="الرابط" name="siteUrl">
        <UInput v-model="state.siteUrl" />
      </UFormGroup>
      <UFormGroup label="الصوره" name="logoUrl">
        <UInput
          ref="logo"
          type="file"
          v-model="state.logoUrl"
          @change="image_change" />
      </UFormGroup>

      <img :src="image_url || state.logoUrl" alt="" />
      <template #footer>
        <div>
          <UButton color="gray" @click="partnerStore.reset();;navigateTo('/partner')"> عوده </UButton>
          <UButton
            type="submit"
            :loading="
              createPartner.status.value == 'pending' ||
              updatePartner.status.value == 'pending'
            "
            >{{ partnerStore.editmode ? "تعديل" : "اضافة" }}</UButton
          >
        </div>
      </template>
    </UCard>
  </UForm>
</template>

<script lang="ts" setup>
import { object, string } from "yup";
import type { Partner } from "~/models/partner";
import { useMyPartnerStore } from "~/store/partner";

const partnerStore = useMyPartnerStore();
const partnerApi = usePartner();
const logo = ref();
const image_url = ref();
const image_change = () => {
  const logoimage = logo.value.input as HTMLInputElement;
  if (logoimage.files && logoimage.files.length > 0) {
    const logoFile = logoimage.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      image_url.value = reader.result;
    };
    reader.readAsDataURL(logoFile);
  }
};
const toast = useToast();
let schema = object({});
if (partnerStore.editmode) {
  schema = object({
    name: string().required(),
    siteUrl: string()
      .required()
      .matches(
        /^(https?:\/\/)?((([a-zA-Z\d]([a-zA-Z\d-]*[a-zA-Z\d])*)\.)+[a-zA-Z]{2,}|\d{1,3}(\.\d{1,3}){3}|(\[(?:[a-fA-F\d]{1,4}:){7}[a-fA-F\d]{1,4}\]))(:\d+)?(\/[-a-zA-Z\d%_.~+]*)*(\?[;&a-zA-Z\d%_.~+=-]*)?(#[a-zA-Z\d_-]*)?$/i,
        "this not valid link"
      ),
    logoUrl: string(),
  });
} else {
  schema = object({
    name: string().required(),
    siteUrl: string()
      .required()
      .matches(
        /^(https?:\/\/)?((([a-zA-Z\d]([a-zA-Z\d-]*[a-zA-Z\d])*)\.)+[a-zA-Z]{2,}|\d{1,3}(\.\d{1,3}){3}|(\[(?:[a-fA-F\d]{1,4}:){7}[a-fA-F\d]{1,4}\]))(:\d+)?(\/[-a-zA-Z\d%_.~+]*)*(\?[;&a-zA-Z\d%_.~+=-]*)?(#[a-zA-Z\d_-]*)?$/i,
        "this not valid link"
      ),
    logoUrl: string().required(),
  });
}

const state = reactive<Omit<Partner, "id">>({
  name: "",
  siteUrl: "",
  logoUrl: "",
});
if (partnerStore.editmode) {
  state.name = partnerStore.S_P.name;
  state.siteUrl = partnerStore.S_P.siteUrl;
  // state.logoUrl = partnerStore.S_P.logoUrl;
  image_url.value = partnerStore.S_P.logoUrl;
}

const createPartner = await partnerApi.createPartner();
const updatePartner = await partnerApi.updatePartner();

const onSubmit = async () => {
  if (partnerStore.editmode) {
    const logoimage = logo.value.input as HTMLInputElement;
    let logoFile: File;
    if (logoimage.files && logoimage.files.length > 0) {
      logoFile = logoimage.files[0];
      await updatePartner.fetchRequest(state,  partnerStore.S_P.id,logoFile);
    } else {
      await updatePartner.fetchRequest(state,  partnerStore.S_P.id)
    }
    if (updatePartner.status.value == "success") {
      partnerStore.reset();
      toast.add({ title: "update Doen" });
      navigateTo("/partner");
    } else if (updatePartner.status.value == "error") {
      toast.add({ title: "Error happend" });
    }
  } else {
    const logoimage = logo.value.input as HTMLInputElement;
    if (logoimage.files && logoimage.files.length > 0) {
      const logoFile = logoimage.files[0];
      await createPartner.fetchRequest(state, logoFile);
      if (createPartner.status.value == "error") {
        toast.add({ title: "some error happend" });
      } else if (createPartner.status.value == "success") {
        toast.add({ title: "add is doen" });
        navigateTo("/partner");
      }
    }
  }
};
</script>

<style></style>

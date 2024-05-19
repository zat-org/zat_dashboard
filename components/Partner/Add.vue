<template>
  <UForm :state="state" :schema="schema" @submit="onSubmit">
    <UCard>
      <UFormGroup label="الاسم">
        <UInput v-model="state.name" />
      </UFormGroup>
      <UFormGroup label="الرابط">
        <UInput v-model="state.siteUrl" />
      </UFormGroup>
      <UFormGroup label="الصوره">
        <UInput ref="logo" type="file" v-model="state.logoUrl" />
      </UFormGroup>
      <template #footer>
        <div>
          <UButton color="gray" @click="navigateTo('/partner')" > عوده </UButton>
          <UButton  type="submit" :loading="createPartner.status.value =='pending'" >اضافة</UButton>
        </div>
      </template>
    </UCard>
  </UForm>
</template>

<script lang="ts" setup>
import { object, string } from "yup";
import type { Partner } from "~/models/partner";
const partnerApi = usePartner()
const logo = ref()
const toast =useToast()
const schema = object({
  name:string().required(),
  siteUrl:string().required(),
  logoUrl:string().required()
});
const state = reactive<Omit<Partner, "id">>({
  name: "",
  siteUrl: "",
  logoUrl: "",
});

const createPartner =await partnerApi.createPartner()
const onSubmit =async()=>{
  console.log(logo.value)
const logoimage = logo.value.input as HTMLInputElement
 if(logoimage.files && logoimage.files.length >0){
  const logoFile =  logoimage.files[0]
  await createPartner.fetchRequest(state,logoFile)
  if(createPartner.status.value=="error"){
    toast.add({title:"some error happend"})
  }
  else if(createPartner.status.value=="success"){
    toast.add({title:"add is doen"})
    navigateTo('/partner')
  }


 }
}
</script>

<style></style>

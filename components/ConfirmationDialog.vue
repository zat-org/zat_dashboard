<template>
<UModal dir="rtl">
    <UCard>
      <div class="flex flex-col  items-center  gap-5">
        <h3 class="font-semibold text-2xl "> {{ message }}</h3>
        <div class="flex justify-center  gap-5">

          <UButton @click="onSuccess" color="green">
           تاكيد
          </UButton>
          <UButton @click="onFail" color="red">
           الغاء
          </UButton>
        </div>
      </div>
    </UCard>
  </UModal>
</template>

<script lang="ts" setup>
defineProps<{message:string,}>()
const emit =defineEmits(['success'])
const onSuccess =()=>{
  emit('success')
  modal.close()
}
const modal =useModal()
const onFail =()=>{
 modal.close()
}
</script>

<style>

</style>
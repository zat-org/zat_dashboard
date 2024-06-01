<template>
  <div class="fkex flex-col grow ">
    <h1 class="text-3xl text-primary  font-semibold">
      {{ partnerStore.editmode?"تعدبل شريك":"اضافة شريك" }}
      

    </h1>
    <PartnerAdd :editmode="partnerStore.editmode" />
  </div>
</template>

<script lang="ts" setup>
import { useMyPartnerStore } from '~/store/partner';

const partnerStore =useMyPartnerStore()
</script>

<style>

</style>
import { defineStore } from "pinia";
import type { Partner } from "~/models/partner";

export const useMyPartnerStore = defineStore("myPartnerStore", () => {
  let S_P = ref<Partner>({ id: "", name: "", siteUrl: "" ,logoUrl:""});
  const reset = () => {
    S_P.value.id = "";
    S_P.value.name = "";
    S_P.value.name = "";
    S_P.value.name = "";    
  };
  const editmode = computed(()=>{
    return S_P.value.id ?true:false
  })
  return { S_P, reset  ,editmode};
});

import { defineStore } from "pinia";
import type { IHomeAds } from "~/models/homeAds";
import type { Partner } from "~/models/partner";

export const useMyHomeAddStore = defineStore("myHomeAddStore", () => {
  let S_HA = ref<IHomeAds>({ id: "", title: "", buttonLabel: "" ,imageUrl:"",url:""});
  const reset = () => {
    S_HA.value.id = "";
    S_HA.value.title = "";
    S_HA.value.buttonLabel= "";
    S_HA.value.imageUrl = "";
    S_HA.value.url = "";    

  };
  const editmode = computed(()=>{
    return S_HA.value.id ?true:false
  })
  return { S_HA, reset  ,editmode};
});

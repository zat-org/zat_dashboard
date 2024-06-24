import { defineStore } from "pinia";
import type { ISocialMedia } from "~/models/SocialMedia";

export const useMySocialmediaStore = defineStore("mySocialmediaStore", () => {
  let S_SM = ref<ISocialMedia>({ id: "", name: "", accountUrl: "" ,icon:""});
  const reset = () => {
    console.log("start rest")
    S_SM.value.id = "";
    S_SM.value.name = "";
    S_SM.value.accountUrl = "";
    S_SM.value.icon = "";

    
  };
  return { S_SM, reset };
});

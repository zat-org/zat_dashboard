import { defineStore } from "pinia";
import type { ISocialMedia } from "~/models/SocialMedia";

export const useMySocialmediaStore = defineStore("mySocialmediaStore", () => {
  let S_SM = ref<ISocialMedia>({ id: "", name: "", accountUrl: "" });
  const reset = () => {
    console.log("start rest")
    S_SM.value.id = "";
    S_SM.value.name = "";
    S_SM.value.accountUrl = "";
    
  };
  return { S_SM, reset };
});

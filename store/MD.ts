import { defineStore } from "pinia";

export const useMyMDStore = defineStore("myMDStore", () => {
  const MDTEXT = ref<string>("")
  ;
  const cursor_position = ref(0);
  const set_cursor_position = (value:number)=>{
    cursor_position.value =value
}
  return { MDTEXT, cursor_position ,set_cursor_position};
});

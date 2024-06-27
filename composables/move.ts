// import type { IMessage } from "~/models/";

import type { IMove } from "~/models/move";

export const useMove = () => {
  const { $api } = useNuxtApp();

const makeMove=async()=>{
  // const Body = reactive<IMove>({})
const { data, pending, error, refresh,status,execute } = await useAsyncData(
    'Makemove',
    () => $api('/tournaments/team/make-move',{method:"post"})
);

return  { data, pending, error, refresh } 

} 
return {makeMove}

}

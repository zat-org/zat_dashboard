import type { OfficiantApply } from "~/models/OfficiantApplies";


export const useOfficiantApplies = () => {
  const { $api } = useNuxtApp();
// get all officiant 
const getAllOfficiant =async()=>{
  const { data, pending, error, refresh } = await useAsyncData<{message:string,data:OfficiantApply[]}>(
      'getAllOfficicant',
      () => $api('/officiant/apply', {method:"get"})
  );
  return { data, pending, error, refresh }
}
  // gert officicant by id 
  const getSingleOfficiant =async(id:string)=>{
    const { data, pending, error, refresh ,status} = await useAsyncData<{message:string,data:OfficiantApply}>(
      'getSingleOfficicant',
      () => $api(`/officiant/apply/${id}`, {method:"get"})
    );
    return { data, pending, error, refresh ,status}   
  }

  //  deleet offifciant 

  const deleteSingleOfficiant =async()=>{
    const id =ref('')
    const { data, pending, error, refresh,execute,status} = await useAsyncData<{message:string,data:OfficiantApply}>(
      'deleteSingleOffiociant',
      () => $api(`/officiant/apply/${id.value}`, {method:"delete"}),{immediate:false}
    );
    const fetchRequest =async(_id:string)=>{
      id.value=_id
      await execute()
      await refreshNuxtData("getAllOfficicant");
    }
    return { data, pending, error, refresh,fetchRequest,status }   
  }
  return {getAllOfficiant,getSingleOfficiant,deleteSingleOfficiant}
}
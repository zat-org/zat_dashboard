export const useVisits = () => {
  const { $api } = useNuxtApp();
  const getVisits =async ()=>{
    const { data, pending, error, refresh } = await useAsyncData<{data:number ,message:string}>(
        '',
        () => $api('/metrics/visit/count')
    );
    return { data, pending, error, refresh }
  }
  return { getVisits}
}

export const useCsrfToken = () => {
  const { $api } = useNuxtApp()

  const getToken = async()=>{
    const { data, pending, error, refresh } = await useAsyncData<{token:string}>(
        'getCsrfToken',
        () => $api('/sec/anti-forgery-token')
    );
    return  { data, pending, error, refresh }
  }
  
  return { getToken}
}

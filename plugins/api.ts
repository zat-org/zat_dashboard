import { useAuthStore } from "~/store/auth"

export default defineNuxtPlugin(() => {
    // get user data if it exist or not 
    const authStore = useAuthStore()
    const config = useRuntimeConfig()
    const $api = $fetch.create({
        baseURL: config.public.apiBase,
        headers:{
          
            // Authorization:authStore.isauth? `Bearer ${authStore.user}`:'',
        },
        onRequest({ request, options, error }) {
            if (!options.headers) {
                options.headers = {}; // Ensure headers object exists
              }
        
              if (authStore.isauth) {
                (options.headers as Record<string,string>)["Authorization"]  = `Bearer ${authStore.user}`;
              }
            
        
        },
        onResponseError({response}){
            if (response.status == 401 ){
                 navigateTo('/login')
            }
        }
        })


    
return{
    provide:{
        api:$api
    }
}


})

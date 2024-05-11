import { useAuthStore } from "~/store/auth";

export default defineNuxtPlugin(() => {
  // get user data if it exist or not
  const authStore = useAuthStore();
  const config = useRuntimeConfig();
  const $api = $fetch.create({
    baseURL: config.public.apiBase,
    headers: {
      Authorization: authStore.isauth ? `Bearer ${authStore.user}` : "",
    },
    onRequest({ request, options, error }) {
      // if (!options.headers) {
      //     options.headers = {}; // Ensure headers object exists
      // }
      // if (authStore.isauth) {
      //     options.headers.
      //     options.headers= {...options.headers,'Authorization':`Bearer ${authStore.user}` };
      //     // (options.headers as Record<string, string>)[
      //     //     "Authorization"
      //     // ] = `Bearer ${authStore.user}`;
      // }
    },
    onResponseError({ response }) {
      if (response.status === 401 ){
        console.log("sdasdasd")
      }
    },
  });

  return {
    provide: { 
      api: $api,
    },
  };
});

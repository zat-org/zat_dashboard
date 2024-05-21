import { useAuthStore } from "~/store/auth";

export default defineNuxtPlugin(() => {
  // get user data if it exist or not
  const authStore = useAuthStore();
  const config = useRuntimeConfig();
  const $api = $fetch.create({
    baseURL: config.public.apiBase,
    onRequest({ request, options, error }) {
      options.credentials = "include";
    },
    onResponseError({ response }) {
      if (response.status == 401) {
        navigateTo("/login");
      }
    },
  });

  return {
    provide: {
      api: $api,
    },
  };
});

import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  // if it auth dont go to login again

  const auth_api = useAuth();
  const is_auth = await auth_api.is_auth();

  if (is_auth.status.value == "error") {
    if (to.path != "/login"){
        return navigateTo("/login");
    }
  }
  if (is_auth.status.value == "success") {
  }
});

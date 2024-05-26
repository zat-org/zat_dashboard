import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  // if it auth dont go to login again
  const userStore = useAuthStore();
  const auth_api = useAuth();
  const is_auth = await auth_api.is_auth();
  await is_auth.FetchREQ();
  const logout = await auth_api.logout();
  if (to.path == "/login") {
    if (userStore.user) {
      return navigateTo("/");
    }
  } else if (to.path == "/") {
  } else {
    if (!userStore.user) {
      await logout.execute();
      return navigateTo("/login");
    }
  }
});

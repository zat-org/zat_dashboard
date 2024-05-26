import type { user } from "~/models/auth";

export const useAuthStore = defineStore("auth", () => {
  // make function to take if is
  const user = computed(()=>_user.value)
  const _user=ref<boolean>(false);

  return { user, _user};
});

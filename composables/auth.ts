import { useAuthStore } from "~/store/auth";

export const useAuth = () => {
  const { $api } = useNuxtApp();
  const userStore = useAuthStore();
  const login = async () => {
    let state = reactive({ userName: "", password: "" });
    const { data, pending, error, refresh, execute, status } =
      await useAsyncData(
        "login",
        () => $api("/auth/admin-login", { method: "POST", body: state }),
        { immediate: false }
      );
    const fetchrequest = async (_state: {
      userName: string;
      password: string;
    }) => {
      state = _state;
      await execute();
      if (status.value == "success") {
        userStore._user = true;
      }
    };
    return { data, pending, error, refresh, fetchrequest, status };
  };
  const logout = async () => {
    const { data, pending, error, refresh, execute, status } =
      await useAsyncData(
        "logout",
        () => $api("/auth/logout", { method: "POST" }),
        { immediate: false }
      );
    const FetchREQ = async () => {
      await execute();
      if (status.value == "success") {
        userStore._user = false;
      }
    };
    return { data, pending, error, refresh, execute, FetchREQ };
  };

  const is_auth = async () => {
    const { data, pending, error, refresh, status, execute } =
      await useAsyncData("isauth", () => $api("/auth/is", { method: "GET" }), {
        immediate: false,
      });
    const FetchREQ = async () => {
      await execute();
      if (status.value == "error") {
        userStore._user = false;
      } else if (status.value == "success") {
        userStore._user = true;
      }

    };
    return { data, pending, error, refresh, status, FetchREQ };
  };
  return { login, is_auth, logout };
};

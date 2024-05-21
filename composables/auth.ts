export const useAuth = () => {
  const { $api } = useNuxtApp();
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
    };
    return { data, pending, error, refresh, fetchrequest, status };
  };
  const logout = async () => {
    const { data, pending, error, refresh } = await useAsyncData("logout", () =>
      $api("")
    );
  };

  const is_auth = async () => {
    const { data, pending, error, refresh,status } = await useAsyncData("isauth", () =>
      $api("/auth/is",{method:"GET"})
    );
    return { data, pending, error, refresh,status };
  };
  return { login, is_auth };
};

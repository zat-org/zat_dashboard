   import type { IHomeAds } from "~/models/homeAds";

export const useHomeAds = () => {
  const { $api } = useNuxtApp();
  const createHomeAds = async () => {
    const formdata = ref<FormData>();
    const { data, pending, error, refresh, execute, status } =
      await useAsyncData(
        "createNewHomeAds",
        () => $api("/assets/home-ad", { method: "POST", body: formdata.value }),
        { immediate: false }
      );
    const fetchRequest = async (
      state: Omit<IHomeAds, "image" | "id">,
      image: File
    ) => {
      const _formData = new FormData();
      _formData.append("title", state.title);
      _formData.append("url", state.url);
      _formData.append("buttonLabel", state.buttonLabel);
      _formData.append("image", image);
      formdata.value = _formData;
      await execute();
    };
    return { data, pending, error, refresh, fetchRequest, status };
  };

  const updateHomeAds = async () => {
    const formdata = ref<FormData>();
    const id = ref("");
    const { data, pending, error, refresh, execute } = await useAsyncData(
      "updateHomeAds",
      () =>
        $api(`/assets/home-ad/${id.value}`, {
          method: "PATCH",
          body: formdata.value,
        }),
      { immediate: false }
    );
    const fetchRequest = async (
      state: Omit<IHomeAds, "image" >,
      image: File
    ) => {
      const _formData = new FormData();
      _formData.append("title", state.title);
      _formData.append("url", state.url);
      _formData.append("buttonLabel", state.buttonLabel);
      _formData.append("image", image);
      formdata.value = _formData;
      id.value=state.id
      await execute();
    };
    return { data, pending, error, refresh, fetchRequest };
  };
  const getAllHomeAds = async () => {
    const { data, pending, error, refresh } = await useAsyncData<{
      message: string;
      data: IHomeAds[];
    }>("getAllHomeAds", () => $api("/assets/home-ad"));
    return { data, pending, error, refresh };
  };

  const deleteSingleHomeAds = async () => {
    const id = ref("");
    const { data, pending, error, refresh, execute, status } =
      await useAsyncData(
        "deleteSingleHomeAds",
        () => $api(`/assets/home-ad/${id.value}`, { method: "DELETE" }),
        { immediate: false }
      );
    const fetchRequest = async (_id: string) => {
      id.value = _id;
      await execute();
    };
    return { data, pending, error, refresh, execute, fetchRequest, status };
  };

  return { createHomeAds, getAllHomeAds, deleteSingleHomeAds, updateHomeAds };
};

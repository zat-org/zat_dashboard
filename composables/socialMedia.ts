import type { ISocialMedia } from "~/models/SocialMedia";

export const useSocialMedia = () => {
  const { $api } = useNuxtApp();
  const getAllSocialMedia = async () => {
    const { data, pending, error, refresh } = await useAsyncData<{
      message: string;
      data: ISocialMedia[];
    }>("getAllSocialMedia", () => $api("/assets/social_media"));
    return { data, pending, error, refresh };
  };
  const AddSocialMedia = async () => {
    let _Body = reactive<Omit<ISocialMedia, "id">>({
      name: "",
      accountUrl: "",
    });
    const { data, pending, error, refresh, execute, status } =
      await useAsyncData(
        "AddSocialMedia",
        () => $api("/assets/social_media", { method: "post", body: _Body }),
        { immediate: false }
      );
    const FetcREQ = async (state: Omit<ISocialMedia, "id">) => {
      _Body = state;
      await execute();
    };
    return { data, pending, error, refresh, execute, status, FetcREQ };
  };

  const deleteSocialMedia = async () => {
    const id = ref<string>();
    const { data, pending, error, refresh, execute, status } =
      await useAsyncData(
        "deleteSocialMedia",
        () => $api(`/assets/social_media/${id.value}`, { method: "delete" }),
        { immediate: false }
      );

    const fetchREQ = async (_id: string) => {
      id.value = _id;
      await execute();
    };
    return { fetchREQ, data, pending, error, refresh, execute, status };
  };

  const UpdateSocialMedia = async (id:string) => {
    let state = reactive<Omit<ISocialMedia,"id">>({  name: "", accountUrl: "" });
    const { data, pending, error, refresh, execute, status } =
      await useAsyncData(
        "UpdateSocialMedia",
        () =>
          $api(`/assets/social_media/${id}`, {
            method: "put",
            body: state,
          }),
        { immediate: false }
      );
    const FetchREQ = async (_state: Omit<ISocialMedia,"id">) => {
      state = _state;
      await execute();
    };
    return { data, pending, error, refresh, execute, status, FetchREQ };
  };
  return {
    getAllSocialMedia,
    AddSocialMedia,
    deleteSocialMedia,
    UpdateSocialMedia,
  };
};

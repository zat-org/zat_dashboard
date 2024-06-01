import type { IyoutubeChannel } from "~/models/youtubeChannels";

export const useYoutube = () => {
  const { $api } = useNuxtApp();
  const getAllYoutubeChannels = async () => {
    const { data, pending, error, refresh, status } = await useLazyAsyncData<{
      data: IyoutubeChannel[],
      message: string
    }>("getAllYoutubeChannels", () => $api("assets/youtube-channel"));
    return { data, pending, error, refresh, status };
  };


  
  const addYoutubeChannels = async () => {
    const id = ref<string>();
    const { data, pending, error, refresh, execute, status } =
      await useAsyncData(
        "addYoutubeChannels",
        () =>
          $api("assets/youtube-channel", {
            method: "POST",
            body: { id: id.value },
          }),
        { immediate: false }
      );
    const fetchREQ = async (_id: string) => {
      id.value = _id;
      await execute();
      refreshNuxtData("getAllYoutubeChannels");
    };
    return { data, pending, error, refresh, fetchREQ, status };
  };
  const removeYoutubeChannel = async () => {
    const id = ref<string>();
    const { data, pending, error, refresh, execute ,status} = await useAsyncData(
      "removeYoutubeChannel",
      () => $api(`assets/youtub-channel/${id.value}`, { method: "DELETE" }),
      { immediate: false }
    );
    const fetchREQ = async (_id: string) => {
      id.value = _id;
      await execute();
    };

    return { data, pending, error, refresh, fetchREQ,status };
  };

  return { getAllYoutubeChannels, addYoutubeChannels, removeYoutubeChannel };
};

import type { INews } from "~/models/News";

export const useNews = () => {
  const { $api } = useNuxtApp();
  const addNews = async () => {
    // const new_formData = formData.value;
    // console.log(formData.value)
    const formData = ref<FormData>(new FormData());
    const { data, pending, error, refresh, execute } = await useAsyncData(
      "addNews",
      () =>
        $api("/news", {
          headers: { "Content-Type": "multipart/form-data"},
          method: "POST",
          body: formData,
        }),
      { immediate: false }
    );
    const sendRequest = async (
      state: {
        title: string;
        description: string;
        content: string;
        publishDateUtc: string;
        imageUrl: any;
        isPublished: boolean;
      },
      image: File
    ) => {
      // var reader = new FileReader();
      // console.log( parseDataUrl(files.value).binaryString)

      // console.log( parseDataUrl(files.value).ext)
      formData.value = new FormData();
      // let file: File;
      // const elm = files.value.input as HTMLInputElement;
      // if (elm.files && elm.files.length >= 1) {
      //   file = elm.files[0];
      // }
      formData.value.append("content", state.content);
      formData.value.append("title", state.title);
      formData.value.append("description", state.description);
      formData.value.append("publishDateUtc", state.publishDateUtc);
      formData.value.append("image", image,);
      // ((files.value.input as HTMLInputElement).files as FileList).item(0)as File
      formData.value.append("isPublished", `${state.isPublished}`);
      console.log([...formData.value]);
      await execute();
    };
    return { data, pending, error, refresh, execute, sendRequest };
  };

  const get_all_news = async () => {
    const { data, pending, error, refresh } = await useAsyncData<{
      data: INews;
      message: string;
    }>("get_all_news", () => $api("/news", { method: "GET" }));
    return { data, pending, error, refresh };
  };

  return { addNews, get_all_news };
};

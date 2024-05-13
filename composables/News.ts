import type { INews } from "~/models/News";

export const useNews = () => {
  const { $api } = useNuxtApp();
  const addNews = async () => {
    // const new_formData = formData.value;
    // console.log(formData.value)
    const formData = ref<FormData>(new FormData());
    const { data, pending, error, refresh, execute,status } = await useAsyncData(
      "addNews",
      () =>
        $api("/news", {
          // headers: { },
          method: "POST",
          body: formData.value,
        }),
      { immediate: false }
    );
    const sendRequest = async (
      state: {
        title: string;
        description: string;
        content: string;
        publishDateUtc: string | Date;
        imageUrl: any;
        isPublished: boolean;
      },
      image: File
    ) => {
      formData.value = new FormData();

      formData.value.append("content", state.content);
      formData.value.append("title", state.title);
      formData.value.append("description", state.description);
      formData.value.append("publishDateUtc", state.publishDateUtc as string);
      formData.value.append("image", image);
      formData.value.append("isPublished", `${state.isPublished}`);
      console.log([...formData.value]);
      await execute();
    };
    return { data, pending, error, refresh, execute, status,sendRequest };
  };

  const get_all_news = async () => {
    const { data, pending, error, refresh } = await useAsyncData<{
      data: INews[];
      message: string;
    }>("get_all_news", () => $api("/news", { method: "GET" }));
    return { data, pending, error, refresh };
  };

  const getSingleNews = async (id: string) => {
    const { data, pending, error, refresh,status } = await useAsyncData
    <{message:string,data:INews}>
    (
      "getsinglenews",
      () => $api(`/news/${id}`)
    );
    return { data, pending, error, refresh ,status};
  };
  const deleteNews  = async(id:string)=>{
    const { data, pending, error, refresh,execute,status } = await useAsyncData(
        '',
        () => $api(`/news/${id}`,{method:'DELETE'}),{
          immediate:false
        }
    );
    return { data, pending, error, refresh ,execute,status}
  }
  return { addNews, get_all_news ,getSingleNews,deleteNews};
};

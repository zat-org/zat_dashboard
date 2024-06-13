export const useImage = () => {
  const { $api } = useNuxtApp();
  const upload_image = async () => {
    const form_data = ref<FormData>();
    const { data, pending, error, refresh, status, execute } =
      await useAsyncData<{data:{url:string} , message:string}>(
        "uploadimage",
        () => $api("/media/image", { method: "POST" ,body:form_data.value}),
        { immediate: false }
      );
    const fetchRequest = async (image: File) => {
      const formData = new FormData();
      formData.append("image", image);
      form_data.value = formData;
      await execute();
    };
    return  { data, pending, error, refresh, status, execute ,fetchRequest}
  };
  return {upload_image}
};

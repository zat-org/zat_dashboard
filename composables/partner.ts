import type { Partner } from "~/models/partner";

export const usePartner = () => {
  const { $api } = useNuxtApp();
  const createPartner = async () => {
    const formdata = ref<FormData>();
    const { data, pending, error, refresh, execute,status } = await useAsyncData(
      "createNewPartner",
      () => $api("/assets/partner", { method: "POST", body: formdata.value }),
      { immediate: false }
    );
    const fetchRequest = async (
      state: Omit<Partner, "logoUrl" | "id">,
      logo: File
    ) => {
      const _formData = new FormData();
      _formData.append("name", state.name);
      _formData.append("siteUrl", state.siteUrl);
      _formData.append("logo", logo);
      formdata.value = _formData;
      await execute();
    };
    return { data, pending, error, refresh, fetchRequest,status };
  };

  const updatePartner = async () => {
    const formdata = ref<FormData>();
    const id = ref("");
    const { data, pending, error, refresh, execute ,status} = await useAsyncData(
      "updatePartner",
      () =>
        $api(`/assets/partner/${id.value}`, {
          method: "PATCH",
          body: formdata.value,
        }),
      { immediate: false }
    );
    const fetchRequest = async (
      state: Omit<Partner, "logoUrl"|"id">,
      _id:string,logo?: File,
    ) => {
      const _formData = new FormData();
      _formData.append("name", state.name);
      _formData.append("siteUrl", state.siteUrl);
      if(logo){
        _formData.append("logo", logo);
      }
      formdata.value = _formData;
      id.value = _id;
      await execute();
    };
    return { data, pending, error, refresh, fetchRequest ,status};
  };
  const getAllPartner = async () => {
    const { data, pending, error, refresh } = await useAsyncData<{message:string,data:Partner[]}>(
      "getAllPartner",
      () => $api("/assets/partner")
    );
    return { data, pending, error, refresh };
  };

  const deleteSinglePartner = async () => {
    const id = ref("");
    const { data, pending, error, refresh, execute ,status} = await useAsyncData(
      "deleteSinglePartner",
      () => $api(`/assets/partner/${id.value}`, { method: "DELETE" }),
      { immediate: false }
    );
    const fetchRequest = async (_id: string) => {
      id.value = _id;
      await execute();
      refreshNuxtData("getAllPartner")
    };
    return { data, pending, error, refresh, execute, fetchRequest,status };
  };

  return { createPartner, getAllPartner, deleteSinglePartner, updatePartner };
};

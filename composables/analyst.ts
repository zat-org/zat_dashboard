import type { analystI, createAnalyst, updateAnalyst } from "~/models/Analyst";

export const useAnalyst = () => {
  const { $api } = useNuxtApp();
  const creaetAnalyst = async () => {
    const Body = ref();
    const { data, pending, error, refresh, status, execute } =
      await useAsyncData(
        "creaetAnalyst",
        () => $api("/match/analyst", { method: "POST", body: Body.value }),
        { immediate: false }
      );
    const fetchREQ = async (new_analyst: createAnalyst,image_file:File) => {
      const form_data = new FormData();
      form_data.append("fullName", new_analyst.fullName);
      form_data.append("Image", image_file);
      Body.value = form_data;
      await execute();
    };
    return { data, pending, error, refresh, status, fetchREQ };
  };

  const getAllAnalyst = async () => {
    const { data, pending, error, refresh } = await useAsyncData<{
      message: string;
      data: analystI[];
    }>("getAllAnalyst", () => $api("/match/analyst"));
    return { data, pending, error, refresh };
  };

  const deleteAnalystByID = async () => {
    const id = ref<string>();
    const { data, pending, error, refresh, status, execute } =
      await useAsyncData(
        "deleteAnalystByID",
        () => $api(`/match/analyst/${id.value}`, { method: "delete" }),
        { immediate: false }
      );
    const fetchREQ = async (_id: string) => {
      id.value = _id;
      await execute();
    };
    return { data, pending, error, refresh, fetchREQ, status };
  };

  const getAnalysByID = async () => {
    const id = ref<string>();
    const { data, pending, error, refresh, status, execute } =
      await useAsyncData<{ data: analystI; message: string }>(
        "getAnalysByID",
        () => $api(`/match/analyst/${id.value}`),
        { immediate: false }
      );
    const fetchREQ = async (_id: string) => {
      id.value = _id;
      await execute();
    };
    return { data, pending, error, refresh, status, fetchREQ };
  };

  const updateAnalyst = async () => {
    const id = ref<string>();
    const Body = ref<FormData>();
    const { data, pending, error, refresh, status, execute } =
      await useAsyncData(
        "creaetAnalyst",
        () =>
          $api(`/match/analyst/${id.value}`, {
            body: Body.value,
            method: "patch",
          }),
        { immediate: false }
      );
    const fetchREQ = async (new_analyst: updateAnalyst, _id: string,file?:File) => {
      const form_data = new FormData();
      if (new_analyst.fullName)
        form_data.append("fullName", new_analyst.fullName);
      if (file) form_data.append("Image", file);
      Body.value = form_data;
      id.value = _id;
      await execute();
    };
    return { data, pending, error, refresh, status, fetchREQ };
  };

  return {
    creaetAnalyst,
    getAllAnalyst,
    deleteAnalystByID,
    getAnalysByID,
    updateAnalyst,
  };
};

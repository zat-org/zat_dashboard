import type {
  officiantCreate,
  officiantI,
  officiantUpdate,
} from "~/models/Officaint";

export const useOfficiant = () => {
  const { $api } = useNuxtApp();
  const createOfficiant = async () => {
    const Form_data = ref<FormData>(new FormData());

    const { data, pending, error, refresh, status, execute } =
      await useAsyncData(
        "",
        () => $api("/officiant", { method: "post", body: Form_data.value }),
        { immediate: false }
      );
    const fetchREQ = async (
      new_officaint: officiantCreate,
      imageFile: File
    ) => {
      const form_data = new FormData();
      form_data.append("name", new_officaint.name);
      form_data.append("image", imageFile);
      form_data.append(
        "startOfficiantingOn",
        new_officaint.startOfficiantingOn.toLocaleString()
      );
      Form_data.value = form_data;
      await execute();
    };
    return { data, pending, error, refresh, status, fetchREQ };
  };

  const getAllOfficiants = async () => {
    const { data, pending, error, refresh, status } = await useAsyncData<{
      data: { count: number; officiants: officiantI[] };
      message: string;
    }>("getAllOfficiants", () => $api("/officiant", { method: "get" }));
    return { data, pending, error, refresh, status };
  };
  const getOfficiantbyid = async (id: string) => {
    const { data, pending, error, refresh, status } = await useAsyncData<{
      message: string;
      data: officiantI;
    }>("getOfficiantbyid", () => $api(`/officiant/${id}`));
    return { data, pending, error, refresh, status };
  };
  const deleteOfficiantbyid = async () => {
    const id = ref<string>();
    const { data, pending, error, refresh, execute, status } =
      await useAsyncData(
        "deleteOfficiant",
        () => $api(`/officiant/${id.value}`, { method: "delete" }),
        { immediate: false }
      );
    const fetchREQ = async (_id: string) => {
      id.value = _id;
      await execute();
    };
    return { data, pending, error, refresh, status, fetchREQ };
  };

  const updateOfficiant = async () => {
    const formData = ref<FormData>(new FormData());
    const id  = ref<string> () 
    const { data, pending, error, refresh ,execute , status} = await useAsyncData(
      "",
      () => $api(`/officiant/${id.value}`, { method: "patch",body:formData.value }),
      { immediate: false }
    );
    const fetchREQ =async  (new_officiant: officiantUpdate, _id: string,file?: File) => {
      const form_data = new FormData();
      if (new_officiant.name) {
        form_data.append("name", new_officiant.name);
      }
      if (file) {
        form_data.append("image", file);
      }
      if (new_officiant.startOfficiantingOn) {
        form_data.append(
          "startOfficiantingOn",
          new_officiant.startOfficiantingOn.toLocaleString()
        );
      }
      id.value = _id
      formData.value =form_data
      await execute()
    };
    return { data, pending, error, refresh ,fetchREQ ,status};
  };
  return {
    createOfficiant,
    getAllOfficiants,
    getOfficiantbyid,
    deleteOfficiantbyid,
    updateOfficiant
  };
};

export const useVisits = () => {
  const { $api } = useNuxtApp();
  const getVisits = async () => {
    const { data, pending, error, refresh } = await useAsyncData<{
      data: number;
      message: string;
    }>("getVisits", () => $api("/metrics/visits"));
    return { data, pending, error, refresh };
  };
  return { getVisits };
};

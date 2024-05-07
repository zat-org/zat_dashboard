import type { IApply, IApplyBrief, IJobBrief, IJobs } from "~/models/jobs";

export const useJobAd = () => {
  const { $api } = useNuxtApp();

  const addJobAd = async (new_job: Omit<IJobs, "id" | "createdSince">) => {
    const { data, pending, error, refresh, execute, status } =
      await useAsyncData<{ message: string; data: IJobs }>(
        "addJobAd",
        () => $api("/jobs/ad", { method: "post", body: { ...new_job } }),
        { immediate: false }
      );
    return { data, pending, error, refresh, execute, status };
  };

  const updateJob = async (
    job_id: string,
    new_job: Omit<IJobs, "id" | "createdSince">
  ) => {
    const { data, pending, error, refresh, execute, status } =
      await useAsyncData<{ message: string; data: IJobs }>(
        "updateJobAd",
        () =>
          $api(`/jobs/ad/${job_id}`, { method: "put", body: { ...new_job } }),
        { immediate: false }
      );
    return { data, pending, error, refresh, execute, status };
  };

  const deleteJob = async (job_id: string) => {
    const { data, pending, error, refresh, execute, status } =
      await useAsyncData(
        "updateJobAd",
        () => $api(`/jobs/ad/${job_id}`, { method: "delete" }),
        { immediate: false }
      );
    return { data, pending, error, refresh, execute, status };
  };

  const getAllJobAd = async () => {
    const { data, pending, error, refresh } = await useLazyAsyncData<{
      message: string;
      data: IJobBrief[];
    }>("getAllJobAd", () => $api("jobs/ad", { method: "GET" }));
    return { data, pending, error, refresh };
  };

  const getJob = async (id: string) => {
    const { data, pending, error, refresh } = await useAsyncData<{
      message: string;
      data: IJobs;
    }>("GetSingleJob", () => $api(`jobs/ad/${id}`, { method: "GET" }));
    return { data, pending, error, refresh };
  };
  const getjoballapply = async (id: string) => {
    const { data, pending, error, refresh } = await useLazyAsyncData<{
      message: string;
      data: { briefAd: IJobBrief; briefApplies: IApplyBrief[] };
    }>("", () => $api(`jobs/ad/${id}/apply`, { method: "GET" }));
    return { data, pending, error, refresh };
  };

  const getJobApply = async (job_id: string, id: string) => {
    const { data, pending, error, refresh, status } = await useAsyncData<{
      data: { jobAdvertisement: IJobBrief; jobApply: IApply };
      message: string;
    }>("getsinglejobapply", () => $api(`/jobs/ad/${job_id}/apply/${id}`));
    return { data, pending, error, refresh, status };
  };
  const deletJobApply = async (job_id: string, id: string) => {
    const { data, pending, error, refresh, execute, status } =
      await useAsyncData(
        "deleteSinglejobapply",
        () => $api(`/jobs/ad/${job_id}/apply/${id}`, { method: "DELETE" }),
        { immediate: false }
      );
    return { data, pending, error, refresh, execute, status };
  };
  return {
    addJobAd,
    getAllJobAd,
    getJob,
    getjoballapply,
    updateJob,
    deleteJob,
    getJobApply,
    deletJobApply,
  };
};

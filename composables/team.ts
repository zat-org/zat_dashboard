import type { AddTeamI, ITeam, TeamI, updateTeamI } from "~/models/team";
import { useMyTeamStore } from "~/store/team";

export const useTeam = () => {
  const teamStore = useMyTeamStore();
  const { $api } = useNuxtApp();
  const addTeam = async () => {
    const newTeam = reactive<AddTeamI>({
      name: "",
      logoUrl: "",
      isZatTeam: false,
    });
    const { data, pending, error, refresh, execute, status } =
      await useAsyncData(
        "addTeam",
        () => $api("/tournaments/team", { method: "post", body: newTeam }),
        { immediate: false }
      );

    const fetchREQ = async (new_team: AddTeamI, logo_url: string) => {
      Object.assign(newTeam, new_team);
      newTeam.logoUrl = logo_url;
      await execute();
    };
    return { data, pending, error, refresh, fetchREQ, status };
  };

  const getAllTeams = async () => {
    const { data, pending, error, refresh, status } = await useLazyAsyncData<{
      data: (TeamI | null)[];
      message: string;
    }>("getAllTeams", () => $api("/tournaments/team"));
    return { data, pending, error, refresh };
  };

  const getSingleTeam = async () => {
    const id = ref<string>();
    const { data, pending, error, refresh, status, execute } =
      await useAsyncData<{ data: TeamI; message: string }>(
        "getSingleTeam",
        () => $api(`/tournaments/team/${id.value}`),
        { immediate: false }
      );
    const fetchREQ = async (_id: string) => {
      id.value = _id;
      await execute();
    };
    return { data, pending, error, refresh, fetchREQ, status };
  };
  const deleteTeam = async () => {
    const id = ref<string>();
    const { data, pending, error, refresh, status, execute } =
      await useAsyncData(
        "deleteTeam",
        () => $api(`/tournaments/team/${id.value}`, { method: "delete" }),
        { immediate: false }
      );
    const fetchREQ = async (_id: string) => {
      id.value = _id;
      await execute();
    };
    return { data, pending, error, refresh, fetchREQ, status };
  };

  const updateTeam = async () => {
    const newTeam = reactive<updateTeamI>({
      name: "",
      logoUrl: {
        old: "",
        new: "",
      },
      isZatTeam: false,
    });
    const id = ref<string>();
    const { data, pending, error, refresh, execute, status } =
      await useAsyncData(
        "updateTeam",
        () =>
          $api(`/tournaments/team/${id.value}`, {
            method: "patch",
            body: newTeam,
          }),
        { immediate: false }
      );

    const fetchREQ = async (
      new_team: Omit<AddTeamI, "id">,
      new_logo_url: string,
      old_logo_url: string,
      _id: string
    ) => {
      // Object.assign(newTeam, new_team);
      newTeam.name = new_team.name;
      newTeam.isZatTeam = new_team.isZatTeam;
      if (new_logo_url == old_logo_url) {
        newTeam.logoUrl = null;
      } else {
        newTeam.logoUrl = { new: new_logo_url, old: old_logo_url };
      }
      id.value = _id;
      await execute();
    };
    return { data, pending, error, refresh, fetchREQ, status };
  };

  return { addTeam, getAllTeams, getSingleTeam, deleteTeam, updateTeam };
};

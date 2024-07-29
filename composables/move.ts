// import type { IMessage } from "~/models/";

import type { IMove } from "~/models/move";

export const useMove = () => {
  const { $api } = useNuxtApp();

  const makeMove = async () => {
    let Body = reactive<IMove>({
      playerId: "",
      on: new Date(),
    });
    const { data, pending, error, refresh, status, execute } =
      await useAsyncData(
        "Makemove",
        () => $api("/player/move", { method: "post", body: Body }),
        { immediate: false }
      );
    const fetchREQ = async (movment: IMove) => {
      Object.assign(Body, movment);
      // Body = movment;
      if (Body.fromTeamId == "") {
        Body.fromTeamId = null;
      }
      if (Body.toTeamId == "") {
        Body.toTeamId = null;
      }
      const year = (Body.on as Date).getFullYear();
      const month = String((Body.on as Date).getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const day = String((Body.on as Date).getDate()).padStart(2, '0');
      Body.on =`${year}-${month}-${day}`
      console.log(Body.on)
      await execute();
      if (status.value == "success") {
        refreshNuxtData("getGamePersonByID");
        refreshNuxtData("getPlayerHistory");
      }
    };
    return { data, pending, error, refresh, status, fetchREQ };
  };
  const deleteMove = async () => {
    const player_id = ref<string>();
    const move_id = ref<string>();

    const { data, pending, error, refresh, status, execute } =
      await useAsyncData(
        "deleteMove",
        () =>
          $api(`/player/${player_id.value}/move/${move_id.value}`, {
            method: "delete",
          }),
        { immediate: false }
      );
    const fetchREQ = async (_player_id: string, _move_id: string) => {
      player_id.value = _player_id;
      move_id.value = _move_id;
      await execute();
      if (status.value == "success") {
        refreshNuxtData("getPlayerHistory");
        refreshNuxtData("getGamePersonByID");
      }
    };
    return { data, pending, error, refresh, status, fetchREQ };
  };
  return { makeMove, deleteMove };
};

import type { IPlayer } from "~/models/player";

export const useGameperson = () => {
  const { $api } = useNuxtApp();

  const getAllGamePerson = async (indep: Ref<boolean>) => {
    const { data, pending, error, refresh, status } = await useAsyncData<{
      data: IPlayer[];
      message: string;
    }>(
      "getAllPlayers",
      () =>
        $api(`/game-person`, {
          params: { minim: false },
        }),
      { watch: [indep] }
      // ?indep=${true}&minim=${true}
    );
    return { data, pending, error, refresh, status };
  };
  const getGamePersonByID = async () => {
    const id = ref<string>();
    const date = ref<Date | null>(new Date());
    const { data, pending, error, refresh, status, execute } =
      await useAsyncData<{
        data: IPlayer;
        message: string;
      }>(
        "getGamePersonByID",
        () =>
          $api(`/game-person/${id.value}`, {
            params: { on: date.value ? date.value.toISOString() : null },
          }),
        { immediate: false }
      );
    const fetchREQ = async (_id: string, _date?: Date) => {
      id.value = _id;
      if (_date == null) {
      } else {
        date.value = _date;
      }
      await execute();
    };
    return { data, pending, error, refresh, status, execute, fetchREQ };
  };
  return { getAllGamePerson, getGamePersonByID };
};

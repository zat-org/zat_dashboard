import type { IPlayer, ITPlayer } from "~/models/player";

export const usePlayer = () => {
  const { $api } = useNuxtApp();
  const players: { role: number; name: string }[] = [
    { role: 1, name: "لاعب" },
    { role: 2, name: "كابتن" },
    { role: 3, name: "مدرب" },
  ];

  const addPlayer = async () => {
    let newPlayer = reactive<Omit<IPlayer, "id" | "teamId" | "team">>({
      name: "",
      imageUrl: "",
      socialMedia: [],
      roles: [{ role: 1 }],
    });
    const { data, pending, error, refresh, execute, status } =
      await useAsyncData(
        "addnewPlayer",
        () => $api("/tournaments/player", { method: "post", body: newPlayer }),
        { immediate: false }
      );
    const fetchRequest = async (
      new_player: Omit<IPlayer, "id" | "teamId" | "team">,
      image_url: string
    ) => {
      Object.assign(newPlayer, new_player);
      newPlayer.imageUrl = image_url;
      // console.log(newPlayer)
      await execute();
    };
    return { data, pending, error, refresh, execute, status, fetchRequest };
  };
  const updatePlayer = async () => {
    const id = ref<string>();
    let newPlayer = reactive<Omit<IPlayer, "id" | "teamId" | "team">>({
      name: "",
      imageUrl:{old:"",new:""},
      socialMedia: [],
      roles: [{ role: 1 }],
    });
    const { data, pending, error, refresh, execute, status } =
      await useAsyncData(
        "updatePlayer",
        () =>
          $api(`/tournaments/player/${id.value}`, {
            method: "patch",
            body: newPlayer,
          }),
        { immediate: false }
      );
    const fetchRequest = async (
      new_player: Omit<IPlayer, "id" | "teamId" | "team">,
      old_image_url: string,
      new_image_url: string,
      _id: string
    ) => {
      Object.assign(newPlayer, new_player);
      newPlayer.imageUrl={old:"",new:""}
      
if (newPlayer.imageUrl!== null){
  if ( typeof newPlayer.imageUrl!=="string" ){
    newPlayer.imageUrl.new = new_image_url;
    newPlayer.imageUrl.old= old_image_url;
  }
}
if (newPlayer.imageUrl.new == newPlayer.imageUrl.old ){
  newPlayer.imageUrl=null
}
      id.value = _id;
      // console.log(newPlayer)
      await execute();
    };
    return { data, pending, error, refresh, execute, status, fetchRequest };
  };

  const getAllPlayers = async (indep: Ref<boolean>) => {
    const { data, pending, error, refresh, status } = await useAsyncData<{
      data: ITPlayer[];
      message: string;
    }>(
      "getAllPlayers",
      () =>
        $api(`/tournaments/player`, {
          params: { indep: indep.value, minim: false },
        }),
      { watch: [indep] }
      // ?indep=${true}&minim=${true}
    );
    return { data, pending, error, refresh, status };
  };
  const getPlayerByID = async () => {
    const id = ref<string>();
    const { data, pending, error, refresh, status, execute } =
      await useAsyncData<{
        data: ITPlayer;
        message: string;
      }>("getPlayerByID", () => $api(`/tournaments/player/${id.value}`), {
        immediate: false,
      });

    const fetchREQ = async (_id: string) => {
      id.value = _id;
      await execute();
    };
    return { data, pending, error, refresh, status, execute, fetchREQ };
  };
  const deletePlayer = async () => {
    const id = ref<string>();
    const { data, pending, error, refresh, execute, status } =
      await useAsyncData(
        "deletePlayer",
        () => $api(`/tournaments/player/${id.value}`, { method: "DELETE" }),
        { immediate: false }
      );
    const fetchREQ = async (_id: string) => {
      id.value = _id;
      await execute();
    };
    return { data, pending, error, refresh, execute, status, fetchREQ };
  };
  const getOptionsPlayerRole = () => {
    // return players
    // test
    return players.map((player) => {
      return { role: player.role };
    });
  };
  return {
    addPlayer,
    getAllPlayers,
    getOptionsPlayerRole,
    players,
    getPlayerByID,
    deletePlayer,
    updatePlayer,
  };
};

import type {
  CreatePlayer,
  IPlayer,
  Player,
  PlayerMoves,
  playerPlainMove,
  UpdatePlayer,
} from "~/models/player";

export const usePlayer = () => {
  const { $api } = useNuxtApp();
  const players: { role: number; name: string }[] = [
    { role: 1, name: "لاعب" },
    { role: 2, name: "كابتن" },
    { role: 3, name: "مدرب" },
  ];

  const addPlayer = async () => {
    let newPlayer = reactive<CreatePlayer>({
      name: "",
      imageUrl: "",
      socialMedia: [],
    });
    const { data, pending, error, refresh, execute, status } =
      await useAsyncData(
        "addnewPlayer",
        () => $api("/player", { method: "post", body: newPlayer }),
        { immediate: false }
      );
    const fetchRequest = async (
      new_player: CreatePlayer,
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
    let newPlayer = reactive<UpdatePlayer>({
      name: "",
      imageUrl: { old: "", new: "" },
      socialMedia: [],
    });
    const { data, pending, error, refresh, execute, status } =
      await useAsyncData(
        "updatePlayer",
        () =>
          $api(`/player/${id.value}`, {
            method: "patch",
            body: newPlayer,
          }),
        { immediate: false }
      );
    const fetchRequest = async (
      new_player: CreatePlayer,
      old_image_url: string,
      new_image_url: string,
      _id: string
    ) => {
      Object.assign(newPlayer, new_player);
      newPlayer.imageUrl = { old: "", new: "" };

      if (newPlayer.imageUrl !== null) {
        if (typeof newPlayer.imageUrl !== "string") {
          newPlayer.imageUrl.new = new_image_url;
          newPlayer.imageUrl.old = old_image_url;
        }
      }
      if (newPlayer.imageUrl.new == newPlayer.imageUrl.old) {
        newPlayer.imageUrl = null;
      }
      id.value = _id;
      // console.log(newPlayer)
      await execute();
    };
    return { data, pending, error, refresh, execute, status, fetchRequest };
  };

  const getPlayerByID = async () => {
    const id = ref<string>();
    const date = ref<Date | null>(new Date());
    const { data, pending, error, refresh, status, execute } =
      await useAsyncData<{
        data: IPlayer;
        message: string;
      }>(
        "getPlayerByID",
        () =>
          $api(`/player/${id.value}`, {
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
  const getPlayerHistory = async (id: string) => {
    const { data, pending, error, refresh, status, execute } =
      await useAsyncData<{
        data: { player: Player; moves: PlayerMoves[] };
        message: string;
      }>("getPlayerHistory", () => $api(`player/${id}/move`));
    const getmovesdate = () => {
      if (status.value == "success") {
        return data.value?.data.moves.map((move) => {
          return move.on;
        });
      }
      return null;
    };
    return { data, pending, error, refresh, status, getmovesdate };
  };

//   const getplayerPlainHistory = async (id: string) => {
//     const { data, pending, error, refresh, status, execute } =
//       await useAsyncData<{
//         data: playerPlainMove[] ;
//         message: string;
//       }>("getPlayerPlainHistory", () => $api(`player/${id}/move`));
 
// const getdates = ()=>{
//   if (status.value =="success" ){
//     return data.value?.data.map(move=>{
//       return move.dateUtc
//     })
//   }{
//     return null
//   }

// }

      
//     return { data, pending, error, refresh, status, getdates };
//   };
  const deletePlayer = async () => {
    const id = ref<string>();
    const { data, pending, error, refresh, execute, status } =
      await useAsyncData(
        "deletePlayer",
        () => $api(`/player/${id.value}`, { method: "DELETE" }),
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
    // getAllPlayers,
    getOptionsPlayerRole,
    players,
    getPlayerByID,
    deletePlayer,
    updatePlayer,
    getPlayerHistory,
    // getplayerPlainHistory
  };
};

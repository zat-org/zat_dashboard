import { defineStore } from "pinia";
import type { ITeam, TeamI } from "~/models/team";

export const useMyTeamStore = defineStore("team", () => {
  let _teams = ref<(TeamI|null)[]>([]);
  const teams =  computed(()=>{
    return _teams.value
  });

  return {teams,_teams};
});

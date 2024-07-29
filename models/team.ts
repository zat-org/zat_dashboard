// import type { ITPlayer } from "./player";

import type { Player } from "./player";

export interface ITeam {
  id: string;
  name: string;
  logoUrl: string;
  establishmentDateUtc: string;
  isZatTeam: boolean;
  players: Player[];
}

export interface AddTeamI {
  name: string;
  logoUrl: string;
  isZatTeam: boolean;
}
// normal team list
export interface TeamI {
  id: string;
  name: string;
  logoUrl: string;
  isZatTeam: boolean;
  establishmentDateUtc: Date;
  championships: any;
  winningChampionships: any;
}
// tea, with line up

export interface LineUpTeamI {
  id: string;
  name: string;
  logoUrl: string;
  isZatTeam: boolean;
  establishmentDateUtc: Date;
  lineup: Player[];
  playerhistory: any;
}
export interface TransferTeamI {
  id: string | null;
  name: string;
}

export interface updateTeamI {
  name: string;
  logoUrl: {
    old: string;
    new: string;
  } | null;
  isZatTeam: boolean;
}

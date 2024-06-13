import type { ITPlayer } from "./player";

export interface ITeam {
  id: string;
  name: string;
  logoUrl: string;
  establishmentDateUtc: string;
  isZatTeam: boolean;
  players: ITPlayer[];
}

export interface IPTeam {
    id: string;
    name: string;
    logoUrl: string;
    establishmentDateUtc: string;
    isZatTeam: boolean;
    players: string[];
  }
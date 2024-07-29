import type { TeamI } from "./team";

export enum ChampionType {}
export interface createChampion {
  name: string;
  logoURL: string;
  rules: string;
  startDateUtc?: string;
  description: string;
  type: ChampionType;
  adBackgroundUrl: string;
  teams: TeamI[];
  champion: TeamI;
}

import type { IPTeam } from "./team";

export interface IPlayer {
  id: string;
  name: string;
  imageUrl: string;
  socialMedia: {
    name: string;
    url: string;
  }[];
  roles: {
    role: number;
  }[];
  teamId: string;
  team: IPTeam;
}
export interface ITPlayer {
    id: string;
    name: string;
    imageUrl: string;
    socialMedia: {
      name: string;
      url: string;
    }[];
    roles: {
      role: number;
    }[];
    teamId: string;
    team: string;
  }
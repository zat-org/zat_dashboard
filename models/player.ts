import type { IPTeam } from "./team";

export interface CreatePlayer {
  name: string;
  imageUrl: string;
  socialMedia: {
    name: string;
    url: string;
    icon: string;
  }[];
}

export interface IPlayer {
  id: string;
  name: string;
  imageUrl: string | { old: string; new: string } | null;
  socialMedia: {
    name: string;
    url: string;
    icon: string;
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
    icon: string;
  }[];
  roles: {
    role: number;
  }[];
  teamId: string;
  team: string;
}

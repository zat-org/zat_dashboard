import type { TeamI } from "./team";

// export enum  {
//   Trainer = 1,
//   Captain,
// }
export enum playerRole {
  الاعب = 1,
  الكابتن,
  المدرب,
}
export interface CreatePlayer {
  name: string;
  imageUrl: string;
  socialMedia: {
    name: string;
    url: string;
    icon: string;
  }[];
  // playerRoles: { role: playerRole }[];
}
export interface UpdatePlayer {
  name: string;
  imageUrl: string | { old: string; new: string } | null;
  socialMedia: {
    name: string;
    url: string;
    icon: string;
  }[];
  // playerRoles: { role: playerRole }[];
}
export interface Player {
  id: string;
  name: string;
  imageUrl: string | { old: string; new: string } | null;
  socialMedia: {
    name: string;
    url: string;
    icon: string;
  }[];
  role: playerRole;
}
export interface IPlayer extends Player {
  team: {
    id: string;
    name: string;
    logoUrl: string;
    isZatTeam: boolean;
    establishmentDateUtc: string;
  };
}
// export interface ITPlayer extends Player {
//   team: {
//     id: string;
//     name: string;
//     logoUrl: string;
//     isZatTeam: boolean;
//     establishmentDateUtc: string;
//   };
// }

export interface PlayerMoves {
  id: string ;
  player: Player;
  from: TeamI | null;
  to: TeamI | null;
  role: number;
  on: string | Date;
}
export interface playerPlainMove {
  id: string;
  playerId: string;
  teamId: string;
  dateUtc: string;
  role: playerRole;
  player: Player;
  team: TeamI;
}
// player history

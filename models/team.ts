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
    isZatTeam: boolean;
    establishmentDateUtc: string;
    players: string[];
  }

export interface AddTeamI {
  name: string;
  logoUrl: string;
  isZatTeam: boolean;
} 
export interface TeamI {
  id:string
  name: string;
  logoUrl: string;
  isZatTeam: boolean;
  establishmentDateUtc:Date 
} 
export interface updateTeamI{
 name:string ,
 logoUrl:{
  old:string;
  new:string;
 }|null;
 isZatTeam:boolean
  
}
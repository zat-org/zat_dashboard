export enum roleTransation{
  الاعب=1,
  الكابتن,
  المدرب
}  

export interface IMove {
  playerId: string;
  fromTeamId?: string|null;
  toTeamId?:string|null ;
  on:Date|string ;
  playerRole?: roleTransation|null;
}

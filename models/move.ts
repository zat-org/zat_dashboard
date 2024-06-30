export interface IMove {
  playerId: string;
  fromTeamId?: string|null;
  toTeamId?:string|null ;
  on?: string|null ;
  playerRole?: number|null;
}

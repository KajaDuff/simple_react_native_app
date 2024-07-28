export interface ITeam {
  id: number;
  name: string;
  color: string;
}

export interface IPlayer {
  id: number;
  name: string;
  team?: ITeam;
  photo: string | null;
}

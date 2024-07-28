import { RootState } from "..";

export const selectPlayersData = (state: RootState) => {
  return state.players.playersData;
};

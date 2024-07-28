import { IPlayer, ITeam } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PlayerReducerState = {
  playersData: IPlayer[];
};

const initialState: PlayerReducerState = {
  playersData: [],
};

export const playersSlice = createSlice({
  initialState,
  name: "players",
  reducers: {
    setPlayerData: (
      state: PlayerReducerState,
      action: PayloadAction<{ player: IPlayer }>
    ) => {
      state.playersData.push(action.payload.player);
    },
    removePlayerData: (
      state: PlayerReducerState,
      action: PayloadAction<{ id: number }>
    ) => {
      state.playersData = state.playersData.filter(
        (player) => player.id !== action.payload.id
      );
    },
    addPlayersTeam: (
      state: PlayerReducerState,
      action: PayloadAction<{ playerId: number; team: ITeam }>
    ) => {
      const { playerId, team } = action.payload;
      const player = state.playersData.find((player) => player.id === playerId);
      if (player) {
        player.team = team;
      }
    },
  },
});

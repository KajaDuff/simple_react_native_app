import { ITeam } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TeamReducerState = {
  teamsData: ITeam[];
};

const initialState: TeamReducerState = {
  teamsData: [],
};

export const teamsSlice = createSlice({
  initialState,
  name: "teams",
  reducers: {
    setTeamData: (
      state: TeamReducerState,
      action: PayloadAction<{ team: ITeam }>
    ) => {
      state.teamsData.push(action.payload.team);
    },
    removeTeamData: (
      state: TeamReducerState,
      action: PayloadAction<{ id: number }>
    ) => {
      state.teamsData = state.teamsData.filter(
        (team) => team.id !== action.payload.id
      );
    },
  },
});

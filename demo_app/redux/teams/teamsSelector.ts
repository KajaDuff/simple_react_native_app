import { RootState } from "..";

export const selectTeamsData = (state: RootState) => {
  return state.teams.teamsData;
};

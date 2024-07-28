import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { teamsSlice } from "./teams/teamsSlice";
import { playersSlice } from "./players/playersSlice";

export const actions = {
  teams: teamsSlice.actions,
  players: playersSlice.actions,
};

const rootReducer = combineReducers({
  teams: teamsSlice.reducer,
  players: playersSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type Store = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

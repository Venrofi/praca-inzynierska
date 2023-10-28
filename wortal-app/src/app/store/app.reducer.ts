// app.reducer.ts

import { createReducer, on } from '@ngrx/store';
import * as memberActions from './member/member.actions';
import { AppState } from 'src/app/app-state.model';

export const initialState: AppState = {
  // Define the initial state properties here
  member: undefined,
};

const reducer = createReducer(
  initialState,
  on(memberActions.update, (state, { member }) => {
    return { ...state, member };
  }),
);

export function appReducer(state: any, action: any) {
  return reducer(state, action);
}

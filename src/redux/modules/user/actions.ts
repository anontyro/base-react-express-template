import { UserState } from './reducer';
import { SET_USER, RESET_USER } from './consts';

export interface SetUser {
  payload: UserState;
  type: SET_USER;
}

export interface ResetUser {
  type: RESET_USER;
}

export type UserActions = SetUser | ResetUser;

export const addUser = (user: UserState): SetUser => ({
  type: SET_USER,
  payload: user,
});

export const resetUser = (): ResetUser => ({
  type: RESET_USER,
});

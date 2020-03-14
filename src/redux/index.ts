import { combineReducers } from 'redux';
import user from './modules/user/reducer';

const rootReducer = combineReducers({
  user,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

import { createStore } from 'redux';
import { usersReducer } from './usersReducers';

export const store = createStore(usersReducer);

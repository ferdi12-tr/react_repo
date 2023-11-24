import { createStore } from 'redux'
import reducer from './reducer'
import loginUserReducer from './loginUserReducer';

export const store = createStore(reducer);
export const loginUserStore = createStore(loginUserReducer);

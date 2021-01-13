import { combineReducers } from 'redux';

import chatReducer from './chatReducer';
import authReducer from './authReducer';

export const reducers = combineReducers({
    chats: chatReducer,
    auth: authReducer,
});

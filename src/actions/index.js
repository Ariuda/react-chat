import chats from '../apis/chats';
import history from '../history';

export const signIn = (email, password) => async (dispatch) => {
    try {
        const response = await chats.post('/sign-in', { email, password });
        dispatch({ type: 'SIGN_IN', payload: response.data });
        history.push('/');
    } catch (err) {
        throw new Error('login failed');
    }
};

export const register = (username, email, password) => async (dispatch) => {
    try {
        const response = await chats.post('/register', { username, email, password });
        dispatch({ type: 'REGISTER', payload: response.data });
        history.push('/');
    } catch (err) {
        throw new Error('registration failed');
    }
};

export const settings = (formValues) => async (dispatch, getState) => {
    try {
        const { userId } = getState().auth;
        const response = await chats.patch(`/${userId}/settings`, formValues);
        dispatch({ type: 'UPDATE_SETTINGS', payload: response.data });
    } catch (err) {
        throw new Error('something went wrong');
    }
};

export const createMessage = (message, chatId) => async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await chats.post(`/${userId}/chat/${chatId}`, { ...message, user: userId });
    dispatch({ type: 'ADD_MESSAGE', payload: response.data });
};

export const fetchChats = () => async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await chats.get(`/${userId}`);
    dispatch({ type: 'FETCH_CHATS', payload: response.data });
};

export const fetchChat = (chatId) => async (dispatch, getState) => {
    try {
        const { userId } = getState().auth;
        const response = await chats.get(`/${userId}/chat/${chatId}`);

        dispatch({ type: 'FETCH_CHAT', payload: response.data });
    } catch (err) {
        throw new Error('something went wrong');
    }
};

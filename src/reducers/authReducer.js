const authState = {
    username: '',
    userId: null,
    theme: 'light',
    beFound: null,
};

export default (state = authState, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                ...state,
                username: action.payload.username,
                userId: action.payload.userId,
                theme: action.payload.theme,
                beFound: action.payload.beFound,
            };
        case 'REGISTER':
            return {
                ...state,
                username: action.payload.username,
                userId: action.payload.id,
                theme: action.payload.theme,
                beFound: action.payload.beFound,
            };
        case 'UPDATE_SETTINGS':
            return {
                ...state,
                username: action.payload.username,
                theme: action.payload.theme,
                beFound: action.payload.beFound,
            };
        default:
            return state;
    }
};

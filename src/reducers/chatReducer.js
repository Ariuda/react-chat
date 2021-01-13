export default (state = {}, action) => {
    switch (action.type) {
        case 'FETCH_CHATS':
            let chats = {};
            action.payload.forEach((chat) => {
                chats[chat.chatId] = {
                    chatId: chat.chatId,
                    to: chat.to,
                    userId: chat.userId,
                    messages: chat.messages,
                };
            });
            return { ...state, ...chats };
        case 'FETCH_CHAT':
            return { ...state, [action.payload.chatId]: action.payload };
        case 'ADD_MESSAGE':
            return { ...state, [action.payload.chatId]: action.payload };
        default:
            return state;
    }
};

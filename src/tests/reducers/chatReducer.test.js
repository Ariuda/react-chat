import chatReducer from '../../reducers/chatReducer';

test('should set default state', () => {
    const state = chatReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({});
});


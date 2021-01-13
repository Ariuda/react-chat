import authReducer from '../../reducers/authReducer';

test('should setup default auth values', () => {
    const state = authReducer(undefined, { type: '@@INIT'});
    expect(state).toEqual({
        username: '',
        userId: null,
        theme: 'light',
        beFound: null
    });
});
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { signIn, register, settings } from '../../actions/index';
import chats from '../../apis/chats';

const mockState = {
    auth: {
        username: 'ninja',
        userId: 12,
        theme: 'light',
        beFound: true
    }
}

describe('set of tests', () => {
    let createMockStore;
    let store;
    beforeAll(() => {
        createMockStore = configureMockStore([thunk]);
        store = createMockStore(mockState);
    });
    

    test('should add new user to database and dispatch a register action', async () => {
        const response = {
            username: 'test',
            email: 'test@test.com',
            password: 'test',
            id: 1,
            theme: 'light',
            beFound: true
        };
        const spy = jest.spyOn(chats, 'post').mockResolvedValue({ data: response });
        await store.dispatch(register('test', 'test@test.com', 'test'));
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REGISTER',
            payload: response
        });
        expect(spy).toBeCalledTimes(1);
        spy.mockRestore();
    });

    test('should sign in a user and dispatch a sign in action', async () => {
        const response = {
            userId: 1, 
            username: 'test', 
            theme: 'light', 
            beFound: true
        };
        const spy = jest.spyOn(chats, 'post').mockResolvedValue({ data: response });
        await store.dispatch(signIn('test@test.com', 'test'))
        const actions = store.getActions();
        expect(actions[1]).toEqual({
            type: 'SIGN_IN',
            payload: response
        });
        expect(spy).toBeCalledTimes(1);
        spy.mockRestore();
    });

    test('should update the settings and dispatch a settings action',  async () => {
        const response = {
            username: 'testy', 
            beFound: false, 
            theme: 'dark'
        };
        const spy = jest.spyOn(chats, 'patch').mockResolvedValue({ data: response });
        await store.dispatch(settings({ username: 'testy', beFound: false, theme: 'dark' }));
        const actions = store.getActions();
        expect(actions[2]).toEqual({
            type: 'UPDATE_SETTINGS',
            payload: response
        });
        expect(spy).toBeCalledTimes(1);
        spy.mockRestore(); 
    });
});
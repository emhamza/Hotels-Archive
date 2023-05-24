import { test, describe, expect } from 'vitest';
import configureStore from 'redux-mock-store';

describe('Room Details', () => {
    const mockStore = configureStore();

    const initialState = {
    rooms: [{ hotel_name: 'Hilton', hotel_id: '123' }],
    filters: [],
    isLoading: false,
    error: undefined,
    searchId: '',
    roomDetails: [{ hotel_name: 'Seashore', distance_to_cc: '123'}],
    detailLoading: false
    }

    test('should store the correct state in the detailStore', () => {
        const detailStore = mockStore(initialState);

        detailStore.dispatch({ type: 'get/details', payload: { result: initialState }});

        expect(detailStore.getState()).toEqual(initialState);
    })
})

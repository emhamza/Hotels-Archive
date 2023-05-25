import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Room from '../components/Rooms/Room';

describe('Room component', () => {
  const mockStore = configureStore();

  const initialState = {
    rooms: [{ hotel_name: 'Hilton', hotel_id: '123' }],
    filters: [],
    isLoading: false,
    error: undefined,
    searchId: '',
    roomDetails: [],
  };

  test('should store the correct state in the store', () => {
    const roomStore = mockStore(initialState);

    roomStore.dispatch({ type: 'get/rooms', payload: { result: initialState } });

    expect(roomStore.getState()).toEqual(initialState);
  });

  test('should render the room component with the correct data', () => {
    const roomStore = mockStore(initialState);

    roomStore.dispatch({ type: 'get/rooms', payload: { result: initialState } });

    render(
      <Provider store={roomStore}>
        <Router>
          <Room room={roomStore.getState().rooms[0]} />
        </Router>
      </Provider>
    );

    const roomElement = screen.getByText(/Hilton/i);

    expect(roomElement).toBeInTheDocument();
  });
});

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    rooms: [],
    isLoading: false,
    filters: [],
    error: undefined,
    searchId: '',
    roomDetails: [],
    detailLoading: true,
}

const options = {
  method: 'GET',
  url: 'https://apidojo-booking-v1.p.rapidapi.com/properties/list',
  params: {
    offset: '0',
    arrival_date: '2023-08-15',
    departure_date: '2023-08-25',
    guest_qty: '1',
    dest_ids: '-3712125',
    room_qty: '1',
    search_type: 'city',
    children_qty: '2',
    children_age: '5,7',
    search_id: 'none',
    price_filter_currencycode: 'USD',
    order_by: 'popularity',
    languagecode: 'en-us',
    travel_purpose: 'leisure'
  },
  headers: {
    'X-RapidAPI-Key': 'ffee46b475msha89779b56ccb7fbp11b51fjsn6207f0c7566a',
    'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com'
  }
};

export const fetchRooms = createAsyncThunk('rooms/get', async () => {
    const res = await axios.request(options);
    return res.data;
});

export const fetchDetails = createAsyncThunk('room/detial', async (payload) => {
    const res = await axios.request({
        method: 'GET',
        url: 'https://apidojo-booking-v1.p.rapidapi.com/properties/detail',
        params: {
            hotel_id: payload.hotel_id,
            search_id: payload.searchId,
            arrival_date: '2023-08-15',
            departure_date: '2023-08-25',
            rec_guest_qty: '2',
            rec_room_qty: '1',
            dest_ids: '-3727579',
            recommend_for: '3',
            languagecode: 'en-us',
            currency_code: 'USD',
            units: 'imperial'
        },
        headers: {
            'X-RapidAPI-Key': 'ffee46b475msha89779b56ccb7fbp11b51fjsn6207f0c7566a',
            'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com'
        },
    });
    return res.data[0];
});

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        clearSearch: (state) => {
            state.searchId = '',
            state.roomDetails= [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRooms.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchRooms.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            const shortListedRooms = [];
            payload.result.map((elm) => shortListedRooms.push({
                hotel_id: elm.hotel_id,
                hotel_name: elm.hotel_name,
                main_photo_url: elm.main_photo_url,
                accommodation_type_name: elm.accommodation_type_name,
                hotel_facilities: elm.hotel_facilities,
            }));
            state.rooms = shortListedRooms;
            state.filters = payload.recommended_filters;
            state.searchId = payload.searchId,
            localStorage.setItem('rooms', JSON.stringify(payload.result));
        });
        builder.addCase(fetchRooms.rejected, (state, {payload}) => {
            state.isLoading = false;
            state.error = payload
        });

        //For the room details
        builder.addCase(fetchDetails.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(fetchDetails.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            const shortListedDetails = {};

            shortListedDetails.hotel_name = payload.hotel_name;
            shortListedDetails.distance_to_cc = payload.distance_to_cc;
            shortListedDetails.composite_price_breakdown = payload.composite_price_breakdown;
            shortListedDetails.rooms = payload.rooms?.[`${Object.keys(payload.rooms)}`];
            shortListedDetails.country_trans = payload.country_trans;
            shortListedDetails.average_room_size_for_ufi_m2 = payload.average_room_size_for_ufi_m2;
            shortListedDetails.breakfast_review_score = payload.breakfast_review_score;

            state.roomDetails = shortListedDetails;
            localStorage.setItem('roomDetails', JSON.stringify(shortListedDetails));
        });
        builder.addCase(fetchDetails.rejected, (state, {payload}) => {
            state.isLoading = false;
            state.error = payload
        });
    },
});

export const { clearSearch } = roomSlice.actions;
export default roomSlice.reducer;
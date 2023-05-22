import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import getData from "./countryApi";

const initialState =[];

//Thunk
export const fetchContriesData = createAsyncThunk('get/countries', async () => {
    const countries = await getData();
    const response = countries.map((item) => ({
        countryId: nanoid(),
        countryName: item.name.common,
        region: item.region,
        lat: item.latlng[0],
        long: item.latlng[1],
        continents: item.continents,
        carSide: item.car.side,
        coatOfArms: item.coatOfArms.png,
        capital: item.capital,
        capitalLocation: item.capitalInfo.latlng,
        language: item.languages,
        subregion: item.subregion,
        currency: item.currencies,
        timezones: item.timezones,
        area: item.area,
        flagSmall: item.flag,
        population: item.population,
        flag: item.flags.png,
    }));
    return response;
})

//Slicer
const countrySlice = createSlice({
    name: 'countries',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchContriesData.fulfilled, (action) => action.payload);
    }
})

export const allCountries = (state) => state.countries;
export default countrySlice.reducer;
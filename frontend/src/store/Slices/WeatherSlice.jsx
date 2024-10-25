// Importa createSlice de Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Acción asíncrona para obtener el clima actual
export const fetchCurrentWeather = createAsyncThunk(
  'weather/fetchCurrentWeather',
  async ({ city, countryCode, temperature }) => {
    const response = await axios.get(`http://localhost:8000/api/weather/current`, {
      params: { city, countryCode, temperature },
    });
    return response.data;
  }
);

// Acción asíncrona para obtener la previsión del clima
export const fetchWeatherForecast = createAsyncThunk(
  'weather/fetchWeatherForecast',
  async ({ city, countryCode, quantityDays, temperature }) => {
    const response = await axios.get(`http://localhost:8000/api/weather/forecast`, {
      params: { city, countryCode, quantityDays, temperature },
    });
    return response.data;
  }
);

// Slice de Redux para el estado del clima
const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    current: null,
    forecast: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentWeather.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchCurrentWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchWeatherForecast.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWeatherForecast.fulfilled, (state, action) => {
        state.loading = false;
        state.forecast = action.payload;
      })
      .addCase(fetchWeatherForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;

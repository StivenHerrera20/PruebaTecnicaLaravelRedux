import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './Slices/themeSlice';
import weatherReducer from './Slices/weatherSlice';
import formReducer from './Slices/formSlice'; 

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    weather: weatherReducer,
    form: formReducer, 
  },
});

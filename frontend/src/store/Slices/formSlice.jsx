import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  city: '',
  countryCode: '',
  forecastType: 'Simple',
  temperature: 'Kelvin',
  submitted: false,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateForm: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
      console.log(action.payload)
    },
    submitForm: (state) => {
      state.submitted = true;
    },
    resetFormSubmission: (state) => {
      state.submitted = false;
    },
  },
});

export const { updateForm, submitForm, resetFormSubmission } = formSlice.actions;
export default formSlice.reducer;

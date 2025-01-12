import { createSlice } from '@reduxjs/toolkit';

// Define initial state
const initialState = {
  selectedPair: 'BTC/USDT',
  startDate: '2025-01-01',
  endDate: '2025-01-10',
  labels: [],
  data: [],
  loading: false,
  error: null,
};

// Create a slice
const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setSelectedPair: (state, action) => {
      state.selectedPair = action.payload;
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setChartData: (state, action) => {
      state.labels = action.payload.labels;
      state.data = action.payload.data;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Export actions and reducer
export const {
  setSelectedPair,
  setStartDate,
  setEndDate,
  setChartData,
  setLoading,
  setError,
} = cryptoSlice.actions;

export default cryptoSlice.reducer;

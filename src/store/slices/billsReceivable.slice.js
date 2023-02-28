import { createSlice } from '@reduxjs/toolkit';

// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const billsReceivableSlice = createSlice({
  name: 'billsReceivable',
  initialState: [],
  reducers: {
    setBillsReceivable: (state, action) => {
      return action.payload;
    }
  }
})

export const { setBillsReceivable } = billsReceivableSlice.actions;

export default billsReceivableSlice.reducer;

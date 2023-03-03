import { createSlice } from '@reduxjs/toolkit';

export const successSlice = createSlice({
    name: 'success',
    initialState: "null",
    reducers: {
        setSuccess: (state, action) => {
            return action.payload;
        }

    }
})

export const { setSuccess } = successSlice.actions;

export default successSlice.reducer;

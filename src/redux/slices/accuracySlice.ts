import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AccuracyState {
    value: number;
}

const initialState: AccuracyState = {
    value: 0,
};

const accuracySlice = createSlice({
    name: 'accuracy',
    initialState,
    reducers: {
        updateAccuracy: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
});

export const {updateAccuracy} = accuracySlice.actions;
export default accuracySlice.reducer;

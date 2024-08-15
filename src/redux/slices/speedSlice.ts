import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface InitialState {
    value: number;
}

interface CalculateSpeedPayload {
    correctSymbols: number;
    timer: number;
}

const initialState: InitialState = {
    value: 0,
};

const speedSlice = createSlice({
    name: 'speed',
    initialState,
    reducers: {
        updateSpeed: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
        calculateSpeed: (state, action: PayloadAction<CalculateSpeedPayload>) => {
            const {correctSymbols, timer} = action.payload;
            if (timer > 0) {
                state.value = Math.round(correctSymbols / (timer / 10) * 60);
            } else {
                state.value = 0;
            }
        },
    },
});

export const {updateSpeed, calculateSpeed} = speedSlice.actions;
export default speedSlice.reducer;

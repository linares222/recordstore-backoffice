import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStates {
    isDarkMode: boolean;
    isSidebarOpen: boolean;
}

const initialState: InitialStates = {
    isDarkMode: false,
    isSidebarOpen: true,
};

export const globalSlice = createSlice({
    name:"global",
    initialState,
    reducers:{
        setIsDarkMode: (state, action: PayloadAction<boolean>) => {
            state.isDarkMode = action.payload
        },
        setIsSidebarOpen: (state, action: PayloadAction<boolean>) => {
            state.isSidebarOpen = action.payload;
        }
    }
})

export const { setIsDarkMode, setIsSidebarOpen} = globalSlice.actions;

export default globalSlice.reducer;
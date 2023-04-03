import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// For general app states, not enough to create a separate slices for each

const appSlice = createSlice({
    name: "app",
    initialState: {
        isModalOpen: false,
        atCurrentNav: "",
    },
    reducers: {
        setIsModalOpen(state, action: PayloadAction<boolean>) {
            state.isModalOpen = action.payload;
        },
        setAtCurrentNav(state, action: PayloadAction<string>) {
            state.atCurrentNav = action.payload;
        }
    }
})

export const { setIsModalOpen, setAtCurrentNav } = appSlice.actions
export default appSlice.reducer
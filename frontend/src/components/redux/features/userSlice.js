import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticate: false, // Typo: Consider renaming to `isAuthenticated` for better readability
};

export const userSlice = createSlice({
    name: "userSlice", // Corrected property name
    initialState, // Pass the initial state directly
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        setIsAuthenticate(state, action) {
            state.isAuthenticate = action.payload;
        },
    },
});

export default userSlice.reducer;

export const { setUser, setIsAuthenticate } = userSlice.actions;
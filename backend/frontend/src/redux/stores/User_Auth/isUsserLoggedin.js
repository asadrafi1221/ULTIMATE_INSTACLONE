import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('User_token');
const initialState = {
    isLoggedIn: !!token,
};

const userSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        loggedIn: (state) => {
            state.isLoggedIn = true; 
        },
        notLoggedIn: (state) => {
            state.isLoggedIn = false;
        }
    }
});

export const { loggedIn, notLoggedIn } = userSlice.actions;
export default userSlice.reducer;

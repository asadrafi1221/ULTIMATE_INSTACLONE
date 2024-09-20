import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    default_id: localStorage.getItem('User_id') ? localStorage.getItem('User_id') : localStorage.getItem('User_token'),
};

const profileSLice = createSlice({
    name: 'getUserProfile',
    initialState,
    reducers: {
        update_id: (state, action) => {
            state.default_id = action.payload;
        },
    }
});

export const { update_id } = profileSLice.actions;
export default profileSLice.reducer;
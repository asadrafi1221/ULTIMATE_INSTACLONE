import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    default_data :[],
};

const userChats = createSlice({
    name: 'getChatUserInfo',
    initialState,
    reducers: {
        update_user: (state, action) => {
            state.default_data = action.payload;
        },
    }
});

export const { update_user } = userChats.actions;
export default userChats.reducer;
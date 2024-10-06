import { configureStore } from '@reduxjs/toolkit';
import userReducer from './User_Auth/isUsserLoggedin.js';  
import getProfilereduces from '../GetProfile/getProfile.js'
import userChats from "../Chat/chatuser.js"
export const store = configureStore({
    reducer: {
        userAuth: userReducer,
        getProfile : getProfilereduces,
        userChat : userChats,
    }
});

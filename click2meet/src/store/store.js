import  {configureStore}  from '@reduxjs/toolkit';
import contactsApiReducer from "../features/api/contactsApi";
import userReducer from "../features/contacts/userReducer"

export const store= configureStore({
    reducer : {
        contactsApi: contactsApiReducer,
        users: userReducer,
    }
})
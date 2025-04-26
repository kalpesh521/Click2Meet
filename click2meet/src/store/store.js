import  {configureStore}  from '@reduxjs/toolkit';
import contactsReducer from "../features/api/contacts";

export const store= configureStore({
    reducer : {
        contacts: contactsReducer,
    }
})
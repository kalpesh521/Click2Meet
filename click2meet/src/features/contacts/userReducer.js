import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [],      
  searchTerm: '',    
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
    },
    updateContact: (state, action) => {
      const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
      if (index !== -1) {
        state.contacts[index] = action.payload;
      }
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { addContact, setContacts, deleteContact, updateContact, setSearchTerm } = userSlice.actions;
export default userSlice.reducer;


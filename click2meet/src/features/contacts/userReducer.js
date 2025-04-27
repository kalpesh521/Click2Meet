import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    addContact: (state, action) => {
      state.push(action.payload);
    },
    setContacts: (state, action) => {
      return action.payload;
    },
    deleteContact: (state, action) => {
      return state.filter((contact) => contact.id !== action.payload);
    },
  },
});

export const { addContact, setContacts , deleteContact } = userSlice.actions;
export default userSlice.reducer;

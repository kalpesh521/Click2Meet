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
    updateContact: (state, action) => {
        const index = state.findIndex(contact => contact.id === action.payload.id);
        if (index !== -1) {
          state[index] = action.payload;
        }
      },
  },
});

export const { addContact, setContacts , deleteContact, updateContact } = userSlice.actions;
export default userSlice.reducer;

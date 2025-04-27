import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  "https://my-json-server.typicode.com/kalpesh521/click2meet-server/contacts";

export const fetchContacts = createAsyncThunk("fetchContacts", async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
});

export const deleteContactFromApi = createAsyncThunk(
  "deleteContactFromApi",
  async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
  }
);

const apiSlice = createSlice({
  name: "contactsApi",
  initialState: {
    isLoading: true,
    isError: false,
    data: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchContacts.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(deleteContactFromApi.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (contact) => contact.id !== action.payload
        );
      });
  },
});

export default apiSlice.reducer;

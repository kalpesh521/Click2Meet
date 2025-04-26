import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchContacts = createAsyncThunk("fetchContacts", async () => {
  const response = await fetch(
    "https://my-json-server.typicode.com/kalpesh521/click2meet-server/contacts"
  );
  return response.json();
});

const apiSlice = createSlice({
  name: "contacts",
   initialState :{
    isLoading :true,
    isError: false,
    data : []
   },

   extraReducers : (builder)=>{
        builder.addCase(fetchContacts.fulfilled , (state, action) =>{
            state.isLoading= false;
            state.data=action.payload;
        });
        builder.addCase(fetchContacts.pending , (state, action) =>{
            state.isLoading= true;
        });
        builder.addCase(fetchContacts.rejected , (state, action) =>{
            state.isError = true;
        })
   }
});

export default apiSlice.reducer;

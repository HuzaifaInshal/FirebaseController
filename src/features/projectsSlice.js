import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
      pushData:(state,action) =>{
        state.push(action.payload);
      }
    },
  });
  
  export const { pushData} = projectsSlice.actions;
  
  export default projectsSlice.reducer;
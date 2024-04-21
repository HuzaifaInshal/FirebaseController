import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
      pushData:(state,action) =>{
        state.push(action.payload);
      },
      emptyData:(state,action)=>{
        state.splice(0,state.length)
      }
    },
  });
  
  export const { pushData,emptyData} = projectsSlice.actions;
  
  export default projectsSlice.reducer;
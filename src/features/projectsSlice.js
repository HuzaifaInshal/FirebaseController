import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
      updateAll: (state, action) => {
        state.value = (action.payload);
      },
      push:(state,action) =>{
        state.value.push = (action.payload);
      }
    },
  });
  
  export const { updateAll ,push} = projectsSlice.actions;
  
  export default projectsSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        id:0,
        orderId:0,
        type:{
            major:'',
            minor:''
        },
        title:'title',
        tagLine:'blah',
        majorHashtags:[],
        minorHashtags:[],
        gitLinks:[],
        liveLinks:[],
        mainPara:'',
        titlePictureURL:'',
        mp4URL:'',
        blogFlow:[]
    },
  };

export const projectSlice = createSlice({
    name: "reservations",
    initialState,
    reducers: {
      updateProject: (state, action) => {
        state.value = (action.payload);
      },
    },
  });
  
  export const { updateProject } = projectSlice.actions;
  
  export default projectSlice.reducer;
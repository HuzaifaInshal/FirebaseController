import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: 0,
    type: {
        major: '',
        minor: ''
    },
    title: '',
    tagLine: '',
    majorHashtags: [''],
    minorHashtags: [''],
    gitLinks: [''],
    liveLinks: [''],
    mainPara: '',
    titlePictureURL: '',
    mp4URL: '',
    blogFlow: '',
};

export const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        update:(state,action)=>{
            return action.payload;
        },
        reset: ()=>{
            return initialState
        }
    },
});

export const { update,reset } = projectSlice.actions;

export default projectSlice.reducer;
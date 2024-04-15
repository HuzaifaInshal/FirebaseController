import { configureStore } from '@reduxjs/toolkit';
import projectReducer from '../features/projectSlice';
import projectsReducer from '../features/projectsSlice';

export const store = configureStore({
    reducer: {
      project:projectReducer,
    projects:projectsReducer,

  },
});

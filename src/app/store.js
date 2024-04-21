import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from '../features/projectsSlice';
import projectReducer from '../features/projectSlice';

export const store = configureStore({
    reducer: {
    projects:projectsReducer,
    project:projectReducer
  },
});

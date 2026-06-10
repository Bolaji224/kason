import { configureStore } from '@reduxjs/toolkit';
import cmsReducer from './slices/cmsSlice';

export const store = configureStore({
  reducer: {
    cms: cmsReducer,
  },
});

// Inferred types — used for typed hooks (useAppDispatch, useAppSelector)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import furnituresReducer from '../features/furnitures/furnitureSlice';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    furnitures: furnituresReducer,
  },
  
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

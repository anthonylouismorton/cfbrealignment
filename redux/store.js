import { configureStore } from '@reduxjs/toolkit';
import fullscreenReducer from './features/slices';
import optionsReducer from './features/optionsSlices';

export const store = () => {
  return configureStore({
    reducer: {
      fullscreenReducer,
      optionsReducer
    }
  })
}

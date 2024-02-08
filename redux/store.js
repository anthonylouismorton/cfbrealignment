import { configureStore } from '@reduxjs/toolkit';
import layoutReducer from './features/layoutSlices';
import optionsReducer from './features/optionsSlices';
import conFilterReducer from './features/conFilterSlices';
import yearReducer from './features/yearSlices';
import conInfoReducer from './features/conInfoSlices'

export const store = () => {
  return configureStore({
    reducer: {
      layoutReducer,
      optionsReducer,
      conFilterReducer,
      yearReducer,
      conInfoReducer
    }
  })
}

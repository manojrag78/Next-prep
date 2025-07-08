import { configureStore } from '@reduxjs/toolkit'
import counterReducer  from './slice/counterSlice'
import taskReducer from './slice/taskSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
      tasks: taskReducer,
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
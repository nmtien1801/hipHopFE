import { configureStore } from '@reduxjs/toolkit'
import { globalReducer } from './slice/globalSlice'
import { moduleAccessReducer } from './slice/moduleAccessSlice'
import { userModuleReducer } from './slice/userModuleSlice'

export const store = configureStore({
  reducer: {
    global: globalReducer,
    moduleAccess: moduleAccessReducer,
    userModule: userModuleReducer,
  },
})

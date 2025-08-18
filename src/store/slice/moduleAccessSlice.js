import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { moduleAccessApi } from 'api/moduleAccessApi'
import { STATUS } from 'constants/common'

const name = 'moduleAccess'
const api = moduleAccessApi
const initialState = {
  status: 'NOT_LOADING',
  error: '',
  dataList: [],
}

export const moduleAccessGetAll = createAsyncThunk(
  `getAll/${name}`,
  async (_, { rejectWithValue }) => {
    try {
      return await api.getAll()
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const moduleAccessSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(moduleAccessGetAll.pending, (state) => {
        state.status = STATUS.LOADING
      })
      .addCase(moduleAccessGetAll.fulfilled, (state, { payload }) => {
        state.status = STATUS.LOADED
        state.dataList = payload
      })
      .addCase(moduleAccessGetAll.rejected, (state, { payload }) => {
        state.status = STATUS.FAILED
        state.error = payload?.message
      })
  },
})

export const { actions: moduleAccessActions, reducer: moduleAccessReducer } =
  moduleAccessSlice

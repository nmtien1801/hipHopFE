import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userModuleApi } from 'api/userModuleApi'
import { STATUS } from 'constants/common'

const name = 'userModule'
const api = userModuleApi

export const userModuleGetAll = createAsyncThunk(
  `getAll/${name}`,
  async (params, { rejectWithValue }) => {
    try {
      return await api.getAllPermission(params)
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)
export const userModuleInsert = createAsyncThunk(
  `Insert/${name}`,
  async (body, { rejectWithValue }) => {
    try {
      return await api.insertPermission(body)
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const getPermission = createAsyncThunk(
  `getPermission/${name}`,
  async (params, { rejectWithValue }) => {
    try {
      return await api.getAllPermission(params)
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

const initialState = {
  status: 'NOT_LOADING',
  error: '',
  dataList: [],
  permissionList: [],
}

export const userModuleSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userModuleGetAll.pending, (state) => {
        state.status = STATUS.LOADING
      })
      .addCase(userModuleGetAll.fulfilled, (state, { payload }) => {
        state.status = STATUS.LOADED
        state.dataList = payload
      })
      .addCase(userModuleGetAll.rejected, (state, { payload }) => {
        state.status = STATUS.FAILED
        state.error = payload?.message
      })

    builder
      .addCase(getPermission.pending, (state) => {
        state.status = STATUS.LOADING
      })
      .addCase(getPermission.fulfilled, (state, { payload }) => {
        state.status = STATUS.LOADED
        state.permissionList = payload
      })
      .addCase(getPermission.rejected, (state, { payload }) => {
        state.status = STATUS.FAILED
        state.error = payload?.message
      })

    builder
      .addCase(userModuleInsert.pending, (state) => {
        state.status = STATUS.LOADING
      })
      .addCase(userModuleInsert.fulfilled, (state) => {
        state.status = STATUS.CREATED
        // state.dataList = payload
      })
      .addCase(userModuleInsert.rejected, (state, { payload }) => {
        state.status = STATUS.FAILED
        state.error = payload?.message
      })
  },
})

export const { actions: userModuleActions, reducer: userModuleReducer } =
  userModuleSlice

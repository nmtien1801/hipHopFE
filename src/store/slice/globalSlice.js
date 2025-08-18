import { createSlice } from '@reduxjs/toolkit'

const name = 'global-state'

export const globalSlice = createSlice({
  name,
  initialState: {
    language: localStorage.getItem('language') || 'vi-VN',
    eventId: localStorage.getItem('eventId') || 0,
    genresId: localStorage.getItem('genresId') || 0,
    genresName: '',
    currencyOption: {
      locales: 'vi-VN',
      currency: 'VND',
    },
    time: localStorage.getItem('time') || 300,
    roundUni: localStorage.getItem('roundUni') || 0,
  },
  reducers: {
    setLanguage(state, action) {
      state.language = action.payload
      localStorage.setItem('language', action.payload)
    },
    setEventID(state, action) {
      state.eventId = action.payload
      localStorage.setItem('eventId', action.payload)
    },
    setGenresID(state, action) {
      state.genresId = action.payload
      localStorage.setItem('genresId', action.payload)
    },
    setGenresName(state, action) {
      state.genresName = action.payload
      localStorage.setItem('genresName', action.payload)
    },
    setTime(state, action) {
      state.time = action.payload
      localStorage.setItem('time', action.payload)
    },
    setRounduni(state, action) {
      state.roundUni = action.payload
      localStorage.setItem('roundUni', action.payload)
    },
  },
})

export const { reducer: globalReducer, actions: globalActions } = globalSlice

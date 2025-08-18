import logo from 'assets/images/logo.png'
import logo_2 from 'assets/images/logo-footer.png'

import { getToken } from 'utils/hash'

export const COUNTRY_LIMIT = 246
export const PHONE_LIMIT = 247
export const LIMIT = 10

export const token = getToken()

export const USER_TYPE = {
  1: 'admin',
  2: 'examiner',
  3: 'player',
}

export const USER_TYPE_ENUM = {
  ADMIN: 1,
  STAFF: 6,
  EXAMINER: 2,
  PLAYER: 3,
}

export const auth = {
  UserID: token?.UserID,
  UUSerID: token?.UserName,
}

export const primaryLogo = logo
export const secondaryLogo = logo_2

export const notRetry = {
  // make it not refetch on window focus
  refetchOnWindowFocus: false,
  // make it not refetch on mount
  refetchOnMount: false,
  // make it not refetch on reconnect
  refetchOnReconnect: false,

  // make it not retry
  retry: false,

  // make it keep previous data, don't call api again when data is not changed
  // keepPreviousData: true,
}

export const currencyOptionList = [
  {
    label: 'VND',
    value: {
      locales: 'vi-VN',
      currency: 'VND',
    },
  },
  {
    label: 'VND',
    value: {
      locales: 'en-US',
      currency: 'USD',
    },
  },
]

export const STATUS = {
  NOT_LOADING: 'not-loading',
  LOADING: 'loading',
  LOADED: 'loaded',
  CREATED: 'created',
  UPDATED: 'updated',
  REMOVED: 'removed',
  FAILED: 'failed',
}

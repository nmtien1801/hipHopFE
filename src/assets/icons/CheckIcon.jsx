import { Box } from '@mui/material'
import React from 'react'

export function CheckIcon(props) {
  return (
    <Box
      sx={{ width: 24, aspectRatio: '46/48', ...props?.sx }}
      component="svg"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="none"
      viewBox="0 0 46 48"
      {...props}
    >
      <path fill="url(#pattern0_421_2726)" d="M0 0H46V48H0z"></path>
      <defs>
        <pattern
          id="pattern0_421_2726"
          width="1"
          height="1"
          patternContentUnits="objectBoundingBox"
        >
          <use
            transform="scale(.02174 .02083)"
            xlinkHref="#image0_421_2726"
          ></use>
        </pattern>
        <image
          id="image0_421_2726"
          width="46"
          height="48"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAwCAYAAABuZUjcAAAC70lEQVRogdWZW4hOURTHfyPy4FLCi1vKLZrGA+NanlwitzclpVBuM8x4kUJJvHgY4zYiUnIpiWhELiEhFLmE5sFlXEoxHnxpSGnX+urY9jnfPt/ZZ5/z/Z/2Wd/e6/xa3zpnr7N2VaFQoALVs0uFMY8EFgHdKgl8OXASeAF0dM0BkI12A8uAKcBzNb8SwB8B44CBwKeiMc+pMgR4JtDVQWhyHPGpwE3hq5a8/kd5jPhc4I5ALzFBk0Pw1cBFGa8BToRNzBP4KuCAjE8BLVGT8wK+IwB6D1hcakEetvwGoEnGP4B+QGepRVlHfHsAWmmGDTQZg68FNgeuVeTv2y7OClw9iPsC16eB5jgOssjxhcC5wPV3oE9cJ74jXqtBKy0ox5FP8GHAA822AbhdjjNfqaIC9EYKp6KeAmOTOPShuxq00pwk9/UBfgyYqNlUTfIxidO0weuBpZpN5fTBpI7TzPFpwC2DfTDwIanztCLeH7husK93AU2KEVcV3iTN9hIY4+oGaUR8jwEam1I1jlyDz5YHUpeqRZ64vJHLVOkFfAZ6aPZvwCDgp6sb4TjiVw3QSLnqFBoBHw/UJPSz1bDJINv88YS+jVLgX4DD2pdIHI0GtoXMX5EGNAL+Xgp79ZdeBobHWF8FnA/5rRW44YjzPxVz/DEwAZgFtAGbLNe3SOvXpJVpQaM9nA+BLTLeCVwDJkesrYmAO5O0iCol0+vwAjAvcK1yfyPwW5unHryhIf4HyKsxNZleh/O1aDVKT3p6wNYcAX0kbWgiNqBRwCuDvUkakmdD/P0Cetv2RpIobAN6DdQZ7I0R0EjvL3VoLLb8/dI1tdEfKWc7fICX2vJVt+mtpa+jvqCxLLJGyJFG94g5nXJG89UtXrhsiqw2i6bNIZ/QxKgOr2i9Pl273KNFK05ZW188Y9R0CWj3ix3/Q6Iv8E6ru2vlLNKr4n5IqDyeGbhuzQKaMr+AVDttr4xj9bRdqtwD2nVSj6g2hH8BfwEdcptZXqBiJAAAAABJRU5ErkJggg=="
        ></image>
      </defs>
    </Box>
  )
}

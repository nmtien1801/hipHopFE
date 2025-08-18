import { Typography } from '@mui/material'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

export const CountDownTimer = forwardRef(
    ({ variant = 'h3', defaultTime = 300, ...props }, ref) => {
        const [time, setTime] = useState(defaultTime) // 300 giây = 5 phút
        const [isActive, setIsActive] = useState(false)

        useEffect(() => {
            let interval = null
            if (isActive && time > 0) {
                interval = setInterval(() => {
                    setTime((prevTime) => prevTime - 1)
                }, 1000)
            } else if (!isActive && time !== 0) {
                clearInterval(interval)
            }
            return () => clearInterval(interval)
        }, [isActive, time])

        const formatTime = (seconds) => {
            const minutes = Math.floor(seconds / 60)
            const secs = seconds % 60
            return `${minutes.toString().padStart(2, '0')}:${secs
                .toString()
                .padStart(2, '0')}`
        }

        useImperativeHandle(ref, () => {
            return {
                start: () => setIsActive(true),
                pause: () => setIsActive(false),
                reset: () => setTime(defaultTime),
                getActive: () => isActive,
                getTime: () => time,
            }
        })

        return (
            <Typography variant={variant} {...props}>
                {formatTime(time)}
            </Typography>
        )
    },
)

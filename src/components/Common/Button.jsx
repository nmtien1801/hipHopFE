import active_button_bg from 'assets/images/active-button-bg.png'
import button_bg from 'assets/images/button-bg.png'
import { Stack } from '@mui/material'
import PropTypes from 'prop-types'

Button.propTypes = {
    children: PropTypes.node,
    sx: PropTypes.object,
    disabled: PropTypes.bool,
}

export function Button({ children, sx, disabled, ...props }) {
    return (
        <Stack
            className="button"
            direction="row"
            alignItems="center"
            justifyContent="center"
            component="button"
            disabled={disabled}
            {...props}
            sx={{
                ...sx,

                width: '100%',
                border: 0,
                backgroundImage: `url(${button_bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: 'transparent',

                '&:hover': {
                    backgroundImage: `url(${active_button_bg})`,
                },

                color: 'white',
                textTransform: 'uppercase',
                cursor: 'pointer',
                aspectRatio: 150 / 58,

                transition: '0.35s',
                outline: 'none',
            }}
        >
            {children}
        </Stack>
    )
}

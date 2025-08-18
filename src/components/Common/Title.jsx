import { Stack } from '@mui/material'
import PropTypes from 'prop-types'
import bg1 from 'assets/images/title-bg-1.png'
import bg2 from 'assets/images/title-bg-2.png'
import bg3 from 'assets/images/title-bg-3.png'

Title.propTypes = {
    children: PropTypes.node,
    type: PropTypes.number,
    sx: PropTypes.object,
}

export function Title({ children, sx, type }) {
    return (
        <>
            {type === 1 && (
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    sx={{
                        ...sx,
                        width: '100%',
                        maxWidth: '405px',
                        pl: '6%',
                        pt: '2%',

                        aspectRatio: '405/224',
                        backgroundImage: `url(${bg1})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',

                        color: '#fff',
                    }}
                >
                    {children}
                </Stack>
            )}

            {type === 2 && (
                <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="start"
                    sx={{
                        ...sx,
                        width: '100%',
                        maxWidth: '414px',

                        pr: '10%',
                        pt: { xs: '15%', sm: '10%' },

                        aspectRatio: '414/246',
                        backgroundImage: `url(${bg2})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',

                        color: '#fff',
                    }}
                >
                    {children}
                </Stack>
            )}
            {type === 3 && (
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        ...sx,
                        width: '100%',
                        maxWidth: '412px',
                        pl: '27%',
                        pr: '2%',
                        pt: '1%',

                        aspectRatio: '412/245',
                        backgroundImage: `url(${bg3})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',

                        color: '#fff',
                    }}
                >
                    {children}
                </Stack>
            )}
        </>
    )
}

import { useNavigate } from 'react-router-dom'
import { Box, Button, Stack, Typography } from '@mui/material'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'

export default function NotFound() {
    const navigate = useNavigate()
    const goHome = () => {
        navigate('/home')
    }
    const goBack = () => {
        navigate(-1)
    }
    return (
        <Box>
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    backgroundColor: '#fff',
                    zIndex: 9999,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        gap: '20px',
                    }}
                >
                    {/* <NotFoundIcon fontSize="large" /> */}
                    <Typography variant="h5">404 - Not Found</Typography>
                    <Typography variant="body1">
                        Something went wrong. You might have followed a broken
                        link or typed in a bad URL.
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" onClick={goHome}>
                            Go to Home
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<KeyboardDoubleArrowUpIcon />}
                            onClick={goBack}
                        >
                            Go Back
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}

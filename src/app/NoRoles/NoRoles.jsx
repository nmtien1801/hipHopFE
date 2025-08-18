import { Link } from 'react-router-dom'
import { Box, Button, Container, Stack, Typography } from '@mui/material'

import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import { clearToken } from 'utils/common'

export default function NoRoles() {
    return (
        <Container maxWidth={'lg'} sx={{ mt: 10, mb: 10 }}>
            <Stack justifyContent={'center'} alignItems={'center'}>
                <Typography variant={'h4'} align={'center'}>
                    {`You don't have any roles.`}
                </Typography>
                <Typography variant={'body1'} align={'center'}>
                    Please contact with administrator
                </Typography>

                <Box sx={{ mt: 3 }}>
                    <Button variant={'contained'} onClick={() => clearToken()}>
                        Logout
                    </Button>
                </Box>
                <Box sx={{ mt: 3 }}>
                    <Button
                        variant={'outlined'}
                        component={Link}
                        to={'/'}
                        startIcon={<KeyboardDoubleArrowUpIcon />}
                    >
                        Go to home
                    </Button>
                </Box>
            </Stack>
        </Container>
    )
}

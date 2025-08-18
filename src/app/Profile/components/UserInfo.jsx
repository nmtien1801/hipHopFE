import MailIcon from '@mui/icons-material/Mail'
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined'
import PublicIcon from '@mui/icons-material/Public'
import { Divider, Stack, Switch, Typography } from '@mui/material'
import PropTypes from 'prop-types'

UserInfo.propTypes = {
    profile: PropTypes.object,
    country: PropTypes.object,
}

export function UserInfo({ profile, country }) {
    return (
        <Stack spacing={2}>
            <Typography variant="h6" fontWeight={600}>
                About
            </Typography>

            <Divider />

            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
            >
                <Typography fontWeight={600}>{profile?.FullName}</Typography>
                <Switch color="success" checked={Boolean(profile?.StatusID)} />
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1}>
                <PhoneIphoneOutlinedIcon />{' '}
                <Typography>
                    {profile?.PhoneCode + profile?.PhoneNumber}
                </Typography>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1}>
                <MailIcon /> <Typography>{profile?.Email}</Typography>
            </Stack>

            {country && (
                <Stack direction="row" alignItems="center" spacing={1}>
                    <PublicIcon />{' '}
                    <Typography sx={{ textTransform: 'uppercase' }}>
                        {country.CountryName}
                    </Typography>
                </Stack>
            )}
        </Stack>
    )
}

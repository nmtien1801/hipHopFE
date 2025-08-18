import {
    AppBar,
    Avatar,
    Badge,
    Box,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    styled,
    Toolbar,
    Tooltip,
    Typography,
} from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))

DashboardHeader.propTypes = {
    profile: PropTypes.object,
    settingList: PropTypes.array,
    onChangeToENLanguage: PropTypes.func,
    onChangeToVNLanguage: PropTypes.func,
    goToProfile: PropTypes.func,
    onLogout: PropTypes.func,
}

export function DashboardHeader({
    settingList,
    profile,
    onChangeToENLanguage,
    onChangeToVNLanguage,
    onLogout,
    goToProfile,
}) {
    const [anchorElUser, setAnchorElUser] = React.useState(null)

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    function handleItemClick(key) {
        switch (key) {
            case 'logout':
                onLogout?.()
                handleCloseUserMenu()
                break

            case 'profile':
                goToProfile?.()
                handleCloseUserMenu()
                break

            default:
                break
        }
    }

    return (
        <AppBar color="inherit" position="static" elevation={0}>
            <Toolbar>
                <Box flexGrow={1} />

                <Stack direction="row" alignItems="center">
                    <IconButton onClick={() => onChangeToVNLanguage?.()}>
                        <Stack
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                                borderRadius: '50%',
                                width: 26,
                                height: 26,
                            }}
                        >
                            <Box
                                component="img"
                                sx={{
                                    width: 26,
                                    height: 20,
                                    borderRadius: '4px',
                                    objectFit: 'cover',
                                }}
                                src={`https://flagpedia.net/data/flags/w702/vn.webp`}
                                alt="vn"
                            />
                        </Stack>
                    </IconButton>

                    <IconButton onClick={() => onChangeToENLanguage?.()}>
                        <Stack
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                                borderRadius: '50%',
                                width: 26,
                                height: 26,
                            }}
                        >
                            <Box
                                component="img"
                                sx={{
                                    width: 26,
                                    height: 20,
                                    borderRadius: '4px',
                                    objectFit: 'cover',
                                }}
                                src={`https://flagpedia.net/data/flags/w702/gb.webp`}
                                alt="gb"
                            />
                        </Stack>
                    </IconButton>
                </Stack>

                <Divider
                    orientation="vertical"
                    sx={{
                        border: '1px solid',
                        borderColor: 'grey.300',
                        height: 20,
                        mx: 2,
                    }}
                />

                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <StyledBadge
                                variant="dot"
                                overlap="circular"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                            >
                                <Avatar
                                    sizes="large"
                                    alt={profile?.UserName}
                                    src={profile?.ImagesPaths}
                                    sx={{ width: 40, height: 40 }}
                                />
                            </StyledBadge>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-dashboard"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settingList.map((setting, idx) => (
                            <MenuItem
                                key={idx}
                                onClick={() => handleItemClick(setting.key)}
                            >
                                {setting.icon}
                                <Typography textAlign="center" sx={{ ml: 1 }}>
                                    {setting.label}
                                </Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

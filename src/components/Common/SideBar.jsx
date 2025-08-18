import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
} from '@mui/material'
import logo from 'assets/images/logo-footer.png'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getToken } from 'utils/hash'

export function SideBar({
    open,
    navList,
    onClose,
    settingList,
    onLogout,
    onLogin,
    goToProfile,
    onChangeToVNLanguage,
    onChangeToENLanguage,
    goToHome,
    registerList,
    onRegister,
    goToDashboard,
}) {
    const [selected, setSelected] = useState('')
    const { pathname } = useLocation()
    const token = getToken()
    function handleSettingClick(key) {
        onClose?.()
        switch (key) {
            case 'logout':
                onLogout?.()
                goToHome?.()

                return
            case 'profile':
                goToProfile?.()
                return

            case 'dashboard':
                goToDashboard?.()
                return

            case 'vi':
                onChangeToVNLanguage?.()
                return

            case 'en':
                onChangeToENLanguage?.()
                return

            default:
                return
        }
    }
    function handleRegister(key) {
        onClose?.()
        switch (key) {
            case 'login':
                onLogin?.()
                return
            case 'register':
                onRegister?.()

                return

            case 'vi':
                onChangeToVNLanguage?.()
                return

            case 'en':
                onChangeToENLanguage?.()
                return

            default:
                return
        }
    }

    return (
        <Drawer
            open={open}
            onClose={onClose}
            variant="temporary"
            anchor="left"
            sx={{
                '& .MuiDrawer-paper': {
                    width: '100%',
                    maxWidth: '300px',
                    bgcolor: 'black',
                },
            }}
        >
            <Stack height="100%" spacing={2}>
                <Box
                    sx={{ px: 3, pt: 2 }}
                    onClick={() => {
                        goToHome?.()
                        onClose?.()
                    }}
                >
                    <Box component="img" alt="logo" src={logo} />
                </Box>

                <List>
                    {Array.isArray(navList) &&
                        navList.length > 0 &&
                        navList.map((item, idx) => (
                            <ListItem key={idx}>
                                <ListItemButton
                                    color="inherit"
                                    onClick={(e) => {
                                        goToHome()
                                        e.preventDefault()
                                        onClose?.()

                                        if (item.path) {
                                            setSelected(item.path)
                                            setTimeout(() => {
                                                const element =
                                                    document.getElementById(
                                                        item.path,
                                                    )
                                                if (element) {
                                                    element.scrollIntoView({
                                                        behavior: 'smooth',
                                                        block: 'nearest',
                                                    })
                                                }
                                            }, 300)
                                        }
                                    }}
                                    sx={{
                                        color:
                                            pathname !== '/home'
                                                ? pathname.includes(item.path)
                                                    ? 'primary.main'
                                                    : 'white'
                                                : selected === item.path
                                                ? 'primary.main'
                                                : 'white',
                                    }}
                                >
                                    <ListItemIcon sx={{ color: 'white' }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.label} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                </List>

                {token ? (
                    <List>
                        {Array.isArray(settingList) &&
                            settingList.length > 0 &&
                            settingList.map((item, idx) => (
                                <ListItem key={idx}>
                                    <ListItemButton
                                        color="inherit"
                                        sx={{ color: 'white' }}
                                        onClick={() =>
                                            handleSettingClick(item.key)
                                        }
                                    >
                                        <ListItemIcon
                                            color="inherit"
                                            sx={{ color: 'white' }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item.label} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                    </List>
                ) : (
                    <List>
                        {Array.isArray(registerList) &&
                            registerList.length > 0 &&
                            registerList.map((item, idx) => (
                                <ListItem key={idx}>
                                    <ListItemButton
                                        color="inherit"
                                        sx={{ color: 'white' }}
                                        onClick={() => handleRegister(item.key)}
                                    >
                                        <ListItemIcon
                                            color="inherit"
                                            sx={{ color: 'white' }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item.label} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                    </List>
                )}
            </Stack>
        </Drawer>
    )
}

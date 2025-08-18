import logo from 'assets/images/logo.png'
import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

export function Header({
  navList,
  onToggleDrawer,
  onChangeToVNLanguage,
  onChangeToENLanguage,
  onLoginClick,
  onRegisterClick,
  profile,
  settingList,
  onLogout,
  goToProfile,
  goToHome,
  goToDashboard,
}) {
  const [selected, setSelected] = React.useState('about')
  const { t } = useTranslation()

  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const { pathname } = useLocation()

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
        goToHome?.()
        return

      case 'profile':
        goToProfile?.()
        handleCloseUserMenu()
        return

      case 'dashboard':
        goToDashboard?.()
        handleCloseUserMenu()
        return

      case 'vi':
        onChangeToVNLanguage?.()
        handleCloseUserMenu()
        return

      case 'en':
        onChangeToENLanguage?.()
        handleCloseUserMenu()
        return

      default:
        handleCloseUserMenu()
        return
    }
  }

  return (
    <AppBar position="fixed" sx={{ bgcolor: 'black' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ py: 1 }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { md: 'none' } }}
            onClick={() => onToggleDrawer?.()}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: { md: 'none' }, flexGrow: 1 }} />

          <Box
            width={80}
            onClick={() => goToHome?.()}
            sx={{ cursor: 'pointer' }}
          >
            <Box component="img" alt="logo" src={logo} width="100%" />
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Stack
            direction="row"
            spacing={2.5}
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexGrow: 1,
            }}
          >
            {Array.isArray(navList) &&
              navList.length > 0 &&
              navList.map((item, idx) => (
                <Box key={idx}>
                  <Button
                    sx={{
                      color:
                        pathname !== '/home'
                          ? pathname.includes(item.path)
                            ? 'primary.main'
                            : 'white'
                          : selected === item.path
                          ? 'primary.main'
                          : 'white',

                      '&:hover': {
                        color: 'primary.main',
                      },
                    }}
                    color="inherit"
                    onClick={(e) => {
                      goToHome()
                      e.preventDefault()

                      if (item.path) {
                        setSelected(item.path)
                        setTimeout(() => {
                          const element = document.getElementById(item.path)
                          if (element) {
                            element.scrollIntoView({
                              behavior: 'smooth',
                              block: 'nearest',
                            })
                          }
                        }, 300)
                      }
                    }}
                  >
                    {item.label}
                  </Button>
                </Box>
              ))}
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            {profile ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={profile?.UserName}
                      src={profile?.ImagesPaths}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
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
            ) : (
              <>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ mr: 1 }}
                >
                  <Button
                    color="inherit"
                    onClick={() => onLoginClick?.()}
                    sx={{
                      '&:hover': {
                        color: 'primary.main',
                      },
                    }}
                  >
                    {t('login')}
                  </Button>
                  <Divider
                    orientation="vertical"
                    sx={{
                      border: '1px solid',
                      borderColor: 'grey.300',
                      height: 15,
                    }}
                  />
                  <Button
                    color="inherit"
                    onClick={() => onRegisterClick?.()}
                    sx={{
                      '&:hover': {
                        color: 'primary.main',
                      },
                    }}
                  >
                    {t('register')}
                  </Button>
                </Stack>

                <IconButton
                  color="inherit"
                  onClick={() => onChangeToVNLanguage?.()}
                >
                  <Box
                    component="img"
                    sx={{
                      width: 26,
                      height: 26,
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                    src={`https://flagpedia.net/data/flags/w702/vn.webp`}
                    alt="vn"
                  />
                </IconButton>

                <IconButton
                  color="inherit"
                  onClick={() => onChangeToENLanguage?.()}
                >
                  <Box
                    component="img"
                    sx={{
                      width: 26,
                      height: 26,
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                    src={`https://flagpedia.net/data/flags/w702/gb.webp`}
                    alt="vn"
                  />
                </IconButton>
              </>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

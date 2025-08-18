import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import ContactsIcon from '@mui/icons-material/Contacts'
import DashboardIcon from '@mui/icons-material/Dashboard'
import InfoIcon from '@mui/icons-material/Info'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import LogoutIcon from '@mui/icons-material/Logout'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import RuleIcon from '@mui/icons-material/Rule'
import { Box, Button, Toolbar } from '@mui/material'
import { useAuth } from 'hooks/Auth/auth'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { globalActions } from 'store/slice/globalSlice'
import { getToken } from 'utils/hash'
import { Footer } from '../Common/Footer'
import { Header } from '../Common/Header'
import { SideBar } from '../Common/SideBar'
import LoginIcon from '@mui/icons-material/Login'
import EditNoteIcon from '@mui/icons-material/EditNote'
import { useEvents } from 'hooks/Events/useEvents'

export function MainLayout({ children }) {
  const [open, setOpen] = React.useState(false)
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const token = getToken()

  const { data: profile, logout } = useAuth(token?.UserID)

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [pathname])

  // load động event
  const lang =
    useSelector((state) => state.global.language) ||
    localStorage.getItem('language') ||
    'vi-VN'

  const { data: events, loading } = useEvents({
    page: 1,
    statusID: 1,
    LanguagesID: lang,
  });

  const navList = [
    {
      label: t('about'),
      path: 'about',
      icon: <InfoIcon />,
    },
    {
      label: t('events'),
      path: 'rules',
      icon: <RuleIcon />,
      children: events?.map((ev) => ({
        label: ev.EventName, // giả sử BE trả về field Title
        path: `${ev.EventID}`, // path/id duy nhất
      })),
    },
    {
      label: t('news'),
      path: 'news',
      icon: <NewspaperIcon />,
    },
    {
      label: t('contact'),
      path: 'contact',
      icon: <ContactsIcon />,
    },
  ]

  const settingList = [
    {
      label: t('profile'),
      icon: <AccountCircleOutlinedIcon />,
      key: 'profile',
    },
    {
      label: t('dashboard'),
      key: 'dashboard',
      icon: <DashboardIcon />,
    },
    {
      label: t('logout'),
      icon: <LogoutIcon />,
      key: 'logout',
    },
    {
      label: 'VI',
      key: 'vi',
      icon: (
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
      ),
    },
    {
      label: 'EN',
      key: 'en',
      icon: (
        <Box
          component="img"
          sx={{
            width: 26,
            height: 20,
            borderRadius: '4px',
            objectFit: 'cover',
          }}
          src={`https://flagpedia.net/data/flags/w702/gb.webp`}
          alt="vn"
        />
      ),
    },
  ]

  const registerList = [
    {
      label: t('login'),
      key: 'login',
      icon: <LoginIcon />,
    },
    {
      label: t('register'),
      icon: <EditNoteIcon />,
      key: 'register',
    },
    {
      label: 'VI',
      key: 'vi',
      icon: (
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
      ),
    },
    {
      label: 'EN',
      key: 'en',
      icon: (
        <Box
          component="img"
          sx={{
            width: 26,
            height: 20,
            borderRadius: '4px',
            objectFit: 'cover',
          }}
          src={`https://flagpedia.net/data/flags/w702/gb.webp`}
          alt="vn"
        />
      ),
    },
  ]

  useEffect(() => {
    const lang = localStorage.getItem('language') || 'vi-VN'
    const i18nLang = lang.split('-')[0]

    i18n.changeLanguage(i18nLang)
    dispatch(globalActions.setLanguage(lang))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function goToProfile() {
    navigate(`/profile/${profile?.UserID}`)
  }
  function gotoDashboard() {
    navigate('/auth/welcome')
  }
  function goToHome() {
    navigate('/home')
  }
  function handleRegister() {
    navigate('/auth/player-register')
  }
  function handleChangeENLanguage() {
    i18n.changeLanguage('en')
    dispatch(globalActions.setLanguage('en-US'))
  }
  function handleChangeVILanguage() {
    i18n.changeLanguage('vi')
    dispatch(globalActions.setLanguage('vi-VN'))
  }
  function handleLogin() {
    navigate('/auth/login')
  }

  return (
    <Box width="100%" overflow="hidden" minHeight="100vh">
      <Header
        goToHome={goToHome}
        settingList={settingList}
        goToProfile={goToProfile}
        profile={profile}
        goToDashboard={gotoDashboard}
        onLoginClick={handleLogin}
        onRegisterClick={handleRegister}
        onToggleDrawer={() => setOpen(!open)}
        navList={navList}
        onChangeToENLanguage={handleChangeENLanguage}
        onChangeToVNLanguage={handleChangeVILanguage}
        onLogout={() => logout()}
      />

      <Toolbar disableGutters />

      <SideBar
        navList={navList}
        settingList={settingList}
        open={open}
        profile={profile}
        onLogout={() => logout()}
        goToHome={goToHome}
        onClose={() => setOpen(false)}
        goToProfile={goToProfile}
        onLogin={handleLogin}
        onRegister={handleRegister}
        goToDashboard={gotoDashboard}
        onChangeToENLanguage={handleChangeENLanguage}
        onChangeToVNLanguage={handleChangeVILanguage}
        registerList={registerList}
      />

      <Box>{children}</Box>
      <Footer />

      <Button
        size="large"
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 10,

          width: 40,
          height: 40,

          padding: 0,
          '& span': { m: 0 },
          minWidth: 0,
        }}
        variant="outlined"
        onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
        startIcon={<KeyboardDoubleArrowUpIcon />}
      ></Button>
    </Box>
  )
}

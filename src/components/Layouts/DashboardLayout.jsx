import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import EventIcon from '@mui/icons-material/Event'
import LogoutIcon from '@mui/icons-material/Logout'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import PersonIcon from '@mui/icons-material/Person'
import StyleIcon from '@mui/icons-material/Style'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import TvIcon from '@mui/icons-material/Tv'
import { Box, Stack, Typography } from '@mui/material'
import { USER_TYPE_ENUM } from 'constants/common'
import { useAuth } from 'hooks/Auth/auth'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { globalActions } from 'store/slice/globalSlice'
import { getPermission } from 'store/slice/userModuleSlice'
import { checkPermission, checkRole } from 'utils/checkRole'
import { getToken } from 'utils/hash'
import { DashboardHeader } from '../Common/DashboardHeader'
import { DashboardSideBar } from '../Common/DashboardSideBar'

export function DashboardLayout({ children }) {
  const token = getToken()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation()
  const { data: profile, logout } = useAuth(token?.UserID)

  const userModule = useSelector((state) => state.userModule.permissionList)

  useEffect(() => {
    const lang = localStorage.getItem('language') || 'vi-VN'
    const i18nLang = lang.split('-')[0]

    i18n.changeLanguage(i18nLang)
    dispatch(globalActions.setLanguage(lang))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (profile) {
      dispatch(getPermission({ userID: profile.UserID }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile])

  const navList = [
    {
      label: t('Events'),
      path: '/dashboard/events',
      icon: <EventIcon />,
      hasPermission: checkRole([USER_TYPE_ENUM.ADMIN], profile?.TypeUserID),
    },
    {
      label: t('Genres'),
      path: '/dashboard/genres',
      icon: <StyleIcon />,
      hasPermission: checkRole([USER_TYPE_ENUM.ADMIN], profile?.TypeUserID),
    },
    {
      label: t('News'),
      path: '/dashboard/news',
      icon: <NewspaperIcon />,
      hasPermission:
        checkRole([USER_TYPE_ENUM.ADMIN], profile?.TypeUserID) ||
        (checkRole([USER_TYPE_ENUM.STAFF], profile?.TypeUserID) &&
          checkPermission(userModule, 1).isView),
    },
    {
      // label: t('Administrators'),
      label: 'Administrators',
      path: '/dashboard/staffs',
      icon: <SupervisorAccountIcon />,
      hasPermission: checkRole([USER_TYPE_ENUM.ADMIN], profile?.TypeUserID),
    },
    {
      label: t('Staffs'),
      path: '/dashboard/staff',
      icon: <SupervisorAccountIcon />,
      hasPermission: checkRole([USER_TYPE_ENUM.ADMIN], profile?.TypeUserID),
    },
    {
      label: t('Player'),
      path: '/dashboard/players',
      icon: <PersonIcon />,
      hasPermission:
        checkRole([USER_TYPE_ENUM.ADMIN], profile?.TypeUserID) ||
        (checkRole([USER_TYPE_ENUM.STAFF], profile?.TypeUserID) &&
          checkPermission(userModule, 2).isView),
    },
    {
      label: t('screen'),
      path: '/dashboard/screen',
      icon: <TvIcon />,
      hasPermission: checkRole([USER_TYPE_ENUM.ADMIN], profile?.TypeUserID),
    },
  ]

  const settingList = [
    {
      label: t('logout'),
      key: 'logout',
      icon: <LogoutIcon />,
    },
    {
      label: t('Profile'),
      key: 'profile',
      icon: <AccountCircleOutlinedIcon />,
    },
  ]

  if (!token) {
    return <Navigate to="/auth/login" replace />
  }

  if (
    token &&
    token.TypeUserID !== USER_TYPE_ENUM.ADMIN &&
    token.TypeUserID !== USER_TYPE_ENUM.STAFF
  ) {
    return <Navigate to="/no-roles" replace />
  }

  return (
    <Stack
      direction="row"
      sx={{
        minHeight: '100vh',
        '& *': {
          fontFamily: 'Oswald !important',
        },
      }}
    >
      <Box
        sx={{
          width: 200,
        }}
      >
        <DashboardSideBar navList={navList} />
      </Box>

      <Box sx={{ width: 'calc(100% - 200px)', flexGrow: 1 }}>
        <Stack height="100%">
          <DashboardHeader
            settingList={settingList}
            goToProfile={() => navigate(`/profile/${token.UserID}`)}
            profile={profile}
            onLogout={() => {
              logout()
              navigate('/auth/login')
            }}
            onChangeToENLanguage={() => {
              i18n.changeLanguage('en')
              dispatch(globalActions.setLanguage('en-US'))
            }}
            onChangeToVNLanguage={() => {
              i18n.changeLanguage('vi')
              dispatch(globalActions.setLanguage('vi-VN'))
            }}
          />

          <Box
            flexGrow={1}
            sx={{
              p: 2,
            }}
          >
            {children}
          </Box>

          <Box sx={{ py: 1 }}>
            <Typography textAlign="center" sx={{ py: 2 }}>
              Copyright © {new Date().getFullYear()} Hipfest Entertaiment
              Co.,LTD. All Rights Reserved. Powered by{' '}
              <Typography
                component="a"
                href="http://gvbsoft.vn"
                target="_blank"
                rel="noreferrer"
                color="primary"
              >
                gvbsoft.vn
              </Typography>
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Stack>
  )
}

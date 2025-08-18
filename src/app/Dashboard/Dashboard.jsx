import { LinearProgress } from '@mui/material'
import NotFound from 'app/NotFound/NotFound'
import { DashboardLayout } from 'components/Layouts/DashboardLayout'
import { USER_TYPE_ENUM } from 'constants/common'
import { Suspense } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { checkPermission, checkRole } from 'utils/checkRole'
import { getToken } from 'utils/hash'
import Event from './Events/Events'
import Genres from './Genres/Genres'
import News from './News/News'
import Players from './Players/Players'
import Screen from './Screen/Screen'
import Staff from './Staff/Staff'
import Staffs from './Staffs/Staffs'
import { Welcome } from './Welcome'
import { useSelector } from 'react-redux'

export function Dashboard() {
  const token = getToken()
  const userModule = useSelector((state) => state.userModule.permissionList)
  return (
    <DashboardLayout>
      <Suspense fallback={<LinearProgress />}>
        <Routes>
          <Route
            index
            element={
              <Navigate
                to={
                  checkRole([USER_TYPE_ENUM.ADMIN], token?.TypeUserID)
                    ? 'events'
                    : 'welcome'
                }
              />
            }
          />
          <Route
            path="events/*"
            element={
              checkRole([USER_TYPE_ENUM.ADMIN], token?.TypeUserID) ? (
                <Event />
              ) : (
                <Navigate to="/dashboard/welcome" />
              )
            }
          />
          <Route
            path="genres/*"
            element={
              checkRole([USER_TYPE_ENUM.ADMIN], token?.TypeUserID) ? (
                <Genres />
              ) : (
                <Navigate to="/dashboard/welcome" />
              )
            }
          />
          <Route
            path="news/*"
            element={
              checkRole([USER_TYPE_ENUM.ADMIN], token?.TypeUserID) ||
              checkPermission(userModule, 1).isView ? (
                <News />
              ) : (
                <Navigate to="/dashboard/welcome" />
              )
            }
          />
          <Route
            path="staffs/*"
            element={
              checkRole([USER_TYPE_ENUM.ADMIN], token?.TypeUserID) ? (
                <Staffs />
              ) : (
                <Navigate to="/dashboard/welcome" />
              )
            }
          />
          <Route
            path="staff/*"
            element={
              checkRole([USER_TYPE_ENUM.ADMIN], token?.TypeUserID) ? (
                <Staff />
              ) : (
                <Navigate to="/dashboard/welcome" />
              )
            }
          />
          <Route
            path="players/*"
            element={
              checkRole([USER_TYPE_ENUM.ADMIN], token?.TypeUserID) ||
              checkPermission(userModule, 2).isView ? (
                <Players />
              ) : (
                <Navigate to="/dashboard/welcome" />
              )
            }
          />
          {/* <Route path="guest/*" element={<Guest />} /> */}
          <Route
            path="screen/*"
            element={
              checkRole([USER_TYPE_ENUM.ADMIN], token?.TypeUserID) ? (
                <Screen />
              ) : (
                <Navigate to="/dashboard/welcome" />
              )
            }
          />
          <Route path="welcome" element={<Welcome />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Outlet />
      </Suspense>
    </DashboardLayout>
  )
}

import AOS from 'aos'
import 'aos/dist/aos.css'
import Auth from 'app/Auth/Auth'
import Main from 'app/Main/Main'
import NotFound from 'app/NotFound/NotFound'
import { Profile } from 'app/Profile/pages/Profile'
import Screen from 'app/Screen/Screen'
import { Fragment, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Dashboard } from './app/Dashboard/Dashboard'
import Examiner from './app/Examiner/Examiner'
import NoRoles from './app/NoRoles/NoRoles'
import MC from 'app/MC/MC'

export default function App() {
    useEffect(() => {
        AOS.init()

        AOS.refresh()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [AOS])

    return (
        <Fragment>
            <Routes>
                <Route index element={<Navigate to="home" />} />
                <Route path="home/*" element={<Main />} />
                <Route path="dashboard/*" element={<Dashboard />} />
                <Route path="examiners/*" element={<Examiner />} />
                <Route path="screen/*" element={<Screen />} />
                <Route path="mc/*" element={<MC />} />

                <Route path="auth/*" element={<Auth />} />
                <Route path="profile/:id" element={<Profile />} />

                <Route path="*" element={<NotFound />} />
                <Route path="no-roles" element={<NoRoles />} />
            </Routes>
        </Fragment>
    )
}

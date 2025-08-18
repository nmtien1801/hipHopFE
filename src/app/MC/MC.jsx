import { LinearProgress } from '@mui/material'
import NotFound from 'app/NotFound/NotFound'
import { Suspense } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { getToken } from 'utils/hash'
import { Confrontation } from './Confrontation/Confrontation'
import { Qualifying } from './Qualifying/Qualifying'
import { Welcome } from './Welcome/Welcome'

export default function MC() {
    const token = getToken()

    if (!token) {
        return <Navigate to="/auth/login" replace />
    }

    if (token.TypeUserID !== 4 && token.TypeUserID !== 1) {
        return <Navigate to="/no-roles" />
    }
    return (
        <Suspense fallback={<LinearProgress />}>
            <Routes>
                <Route index element={<Navigate to="welcome" />} />
                <Route path="welcome" element={<Welcome />} />
                <Route path="qualifying" element={<Qualifying />} />
                <Route path="confrontation" element={<Confrontation />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Outlet />
        </Suspense>
    )
}

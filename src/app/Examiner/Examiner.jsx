import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { Qualifying } from './Qualifying/Qualifying'
import { Confrontation } from './Confrontation/Confrontation'
import NotFound from 'app/NotFound/NotFound'
import { useSelector } from 'react-redux'
import { LinearProgress } from '@mui/material'
import { Suspense } from 'react'

export default function Examiner() {
    const eventID =
        useSelector((state) => state.global.eventId) ||
        localStorage.getItem('eventId')
    const genreID =
        useSelector((state) => state.global.genresId) ||
        localStorage.getItem('genresId')

    if (!eventID || !genreID) {
        return <Navigate to="/auth/welcome" />
    }

    return (
        <Suspense fallback={<LinearProgress />}>
            <Routes>
                <Route index element={<Navigate to="qualifying" />} />
                <Route path="qualifying" element={<Qualifying />} />
                <Route path="confrontation" element={<Confrontation />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Outlet />
        </Suspense>
    )
}

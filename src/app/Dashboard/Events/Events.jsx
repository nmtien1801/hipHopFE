import { Route, Routes } from 'react-router-dom'
import { EventPage } from './pages/EventPage'
import { EventDetail } from './pages/EventDetail'

export default function Event() {
    return (
        <Routes>
            <Route index element={<EventPage />} />
            <Route path=":id" element={<EventDetail />} />
        </Routes>
    )
}

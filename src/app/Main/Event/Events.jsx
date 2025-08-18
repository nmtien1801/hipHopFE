import { Route, Routes } from 'react-router-dom'
import { EventDetail } from './pages/EventDetail'

export default function Events() {
    return (
      <Routes>
        <Route path=":id" element={<EventDetail />} />
      </Routes>
    )
}

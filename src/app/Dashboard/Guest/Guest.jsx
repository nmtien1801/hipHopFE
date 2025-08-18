import { Route, Routes } from 'react-router-dom'
import { GuestPage } from './pages/GuestPage'
import { GuestDetail } from './pages/GuestDetail'

export default function Guest() {
  return (
    <Routes>
      <Route index element={<GuestPage />} />
      <Route path=":id" element={<GuestDetail />} />
    </Routes>
  )
}

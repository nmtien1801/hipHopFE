import { Route, Routes } from 'react-router-dom'
import { StaffPage } from './pages/StaffPage'
import { StaffDetail } from './pages/StaffDetail'

export default function Staffs() {
    return (
        <Routes>
            <Route index element={<StaffPage />} />
            <Route path=":id" element={<StaffDetail />} />
        </Routes>
    )
}

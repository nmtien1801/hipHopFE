import { Route, Routes } from 'react-router-dom'
import { PlayerDetail } from './pages/PlayerDetail'
import { PlayerPage } from './pages/PlayerPage'

export default function Players() {
    return (
        <Routes>
            <Route index element={<PlayerPage />} />
            <Route path=":id" element={<PlayerDetail />} />
        </Routes>
    )
}

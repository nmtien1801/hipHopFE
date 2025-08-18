import { Route, Routes } from 'react-router-dom'
import GenreDetail from './pages/GenreDetail'

export default function Genres() {
    return (
        <Routes>
            <Route path=":id" element={<GenreDetail />} />
        </Routes>
    )
}

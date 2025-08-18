import { Route, Routes } from 'react-router-dom'
import { GenrePage } from './pages/GenrePage'
import { GenreDetail } from './pages/GenreDetail'

export default function Genres() {
  return (
    <Routes>
      <Route index element={<GenrePage />} />
      <Route path=":id" element={<GenreDetail />} />
    </Routes>
  )
}

import { Route, Routes } from 'react-router-dom'
import { NewsPages } from './pages/NewsPages'
import { NewsDetail } from './pages/NewsDetail'

export default function News() {
  return (
    <Routes>
      <Route index element={<NewsPages />} />
      <Route path=":id" element={<NewsDetail />} />
    </Routes>
  )
}

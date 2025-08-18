import { Route, Routes } from 'react-router-dom'
import { NewsPage } from './pages/NewsPage'
import { NewsDetail } from './pages/NewsDetail'

export default function News() {
    return (
        <Routes>
            <Route index element={<NewsPage />} />
            <Route path=":id" element={<NewsDetail />} />
        </Routes>
    )
}

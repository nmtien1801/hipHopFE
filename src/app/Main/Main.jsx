import { LinearProgress } from '@mui/material'
import NotFound from 'app/NotFound/NotFound'
import { MainLayout } from 'components/Layouts/MainLayout'
import { Suspense } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import Home from './Home/pages/Home'
import News from './News/News'
import Events from './Event/Events'
import Genres from './Genres/Genres'

export default function Main() {
  return (
    <Suspense fallback={<LinearProgress />}>
      <MainLayout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="events/*" element={<Events />} />
          <Route path="rules/*" element={<Genres />} />
          <Route path="news/*" element={<News />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Outlet />
      </MainLayout>
    </Suspense>
  )
}

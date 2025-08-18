import { Navigate, Route, Routes } from 'react-router-dom'
import { Diagram } from './Diagram/Diagram'
import { Ranking } from './Ranking/pages/Ranking'
import { Round } from './Round/pages/Round'
import { Welcome } from './Welcome/Welcome'
import { UniFinal } from './UniFinal/pages/UniFinal'

export default function Screen() {
  return (
    <Routes>
      <Route index element={<Navigate to="welcome" />} />
      <Route path="welcome" element={<Welcome />} />
      <Route path="ranking" element={<Ranking />} />
      <Route path="round/:id" element={<Round />} />
      <Route path="diagram" element={<Diagram />} />
      <Route path="uni-final" element={<UniFinal />} />
    </Routes>
  )
}

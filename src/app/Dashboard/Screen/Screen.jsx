import { Navigate, Route, Routes } from 'react-router-dom'
import { Ranking } from './Ranking/pages/Ranking'
import { Welcome } from './Welcome/Welcome'
import { Round } from './Round/pages/Round'
import { Diagram } from './Diagram/Diagram'
import { UniLastRound } from './UniRanking/pages/UniLastRound'

export default function Screen() {
  return (
    <Routes>
      <Route index element={<Navigate to="welcome" />} />
      <Route path="welcome" element={<Welcome />} />
      <Route path="ranking" element={<Ranking />} />
      <Route path="round/:id" element={<Round />} />
      <Route path="diagram" element={<Diagram />} />
      <Route path="uniranking" element={<UniLastRound />} />
    </Routes>
  )
}

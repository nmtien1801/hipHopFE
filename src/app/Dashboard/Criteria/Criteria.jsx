import { Route, Routes } from 'react-router-dom';
import { CriteriaPages } from './pages/CriteriaPages';
import { CriteriaDetail } from './pages/CriteriaDetail';

export default function Criteria() {
  return (
    <Routes>
      <Route index element={<CriteriaPages />} />
      <Route path=":id" element={<CriteriaDetail />} />
    </Routes>
  );
}